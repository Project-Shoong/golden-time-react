import { useEffect, useRef, useState } from 'react';
import '../../assets/style/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

const Emergency = ()=>{
    const {Tmapv2} = window;
    const mapRef = useRef(null); //지도 객체 관리
    const markersRef = useRef([]); //마커 객체 배열 관리
    const [realResults, setRealResults] = useState([]); //검색결과
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [region, setRegion] = useState({sido:"", sigungu:""});
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const markerImage = images['marker_emergency.png'];

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";

    // 지도 초기화, 현재 위치
    useEffect(() => {
        const mapDiv = document.getElementById("map_div");
        if(!mapDiv.firstChild && Tmapv2) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    initializeMap(latitude, longitude);
                },
                () => {
                    // 실패 시 기본 좌표
                    initializeMap(37.566481622437934,126.98502302169841);
                }
            );
        }
    }, []);

    // 지역, 키워드 업데이트
    useEffect(() => {
        if (region.sigungu || searchKeyword) {
            getSearchResults();
        }
    }, [region.sigungu, searchKeyword]);

    // 마커 업데이트
    useEffect(() => {
        if (realResults.length > 0) {
            createMarkers(realResults); 
        }
    }, [realResults]);

    // 응급실 api 요청
    const getSearchResults = async () => {
        const {sido, sigungu} = region;
        try {
            const [response1, response2] = await axios.all([
                // 응급실 실시간 가용병상정보 조회
                axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        STAGE1: sido,
                        STAGE2: sigungu,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
                // 기관 정보 
                axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        Q0: sido,
                        Q1: sigungu,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
            ]);

            const realTime = response1.data?.response?.body?.items?.item;
            const organList = response2.data?.response?.body?.items?.item;

            const realTimeArray = Array.isArray(realTime) ? realTime : realTime ? [realTime] : [];
            const organListArray = Array.isArray(organList) ? organList : organList ? [organList] : [];

            // 데이터 병합
            const realData = organListArray.map((organItem) => {
                const realItem = realTimeArray.find((real) => real.hpid === organItem.hpid);
                return {...organItem, ...realItem};
            })

            // keyword 기반 필터링
            const filteredData = searchKeyword 
                ? realData.filter((item) => 
                    item.dutyName?.includes(searchKeyword) || item.dutyAddr?.includes(searchKeyword))
                : realData;

            setRealResults(filteredData); //결과 업데이트
            createMarkers(filteredData); //마커 생성

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };
    
    // 지도
    const initializeMap = (lat, lon) => {
        if(!mapRef.current && Tmapv2) {
            mapRef.current = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(lat, lon),
                zoom: 15,
            });
        }
    }
    
    // 지도 범위 및 줌 설정
    const adjustMapToMarkers = (positions) => {
        if (positions.length === 0 || !mapRef.current) return;

        const latitudes = positions.map((pos) => parseFloat(pos.latitude));
        const longitudes = positions.map((pos) => parseFloat(pos.longitude));

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        const bounds = new Tmapv2.LatLngBounds(
            new Tmapv2.LatLng(minLat, minLon), // 남서쪽
            new Tmapv2.LatLng(maxLat, maxLon)  // 북동쪽
        );

        mapRef.current.fitBounds(bounds);
    }

    // 마커
    const createMarkers = (filteredData) => {
        if(!mapRef.current) return;

        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // 새 마커 추가
        const positions = [];
        const newMarkers = filteredData.map((emergency) => {
            const {wgs84Lat: latitude, wgs84Lon: longitude} = emergency;
            const marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(latitude, longitude),
                map: mapRef.current,
                icon: markerImage,
            });
            positions.push({latitude, longitude});
            return marker;
        });
        markersRef.current = newMarkers;

        adjustMapToMarkers(positions);
    };

    // 종합상환판 열림
    const handleOpenDetail = (emergency) => {
        setSelectedEmergency(emergency);
        setIsDetailOpen(true);
    };

    // 종합상환판 닫힘
    const handleCloseDetail = () => {
        setSelectedEmergency(null);
        setIsDetailOpen(false);
    };

    // onSearch 핸들러 - 지역/키워드 업데이트
    const handleSearch = ({region, keyword: searchKeyword }) => {
        setRegion(region);
        setSearchKeyword(searchKeyword);
    };

    return (
        <div id="emergency" className="emergency-container">
            <div id="map_div" className="map-background" ></div>
            <div className="sidebar">
                <EmergencySearch onSearch={handleSearch} />
                <div className="total-count r15b">총 {realResults.length} 건</div>
                <div className="scroll">
                    <EmergencyList results={realResults} onClick={handleOpenDetail} />
                </div>
            </div>
            {isDetailOpen && (
                <div className={selectedEmergency?.dutyEmclsName === "응급실운영신고기관" ? "simple-detail" : "situation-board scroll"}>
                    {selectedEmergency ? ( 
                        selectedEmergency.dutyEmclsName === "응급실운영신고기관" ? (
                            <>
                                <div className="non-title">
                                    <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
                                    <button className="close-button right-0" onClick={handleCloseDetail}>
                                        <img src={images['close16.png']} alt="닫기" />
                                    </button>
                                </div>
                                <div>현재 제공되는 종합상황판이 없습니다.</div>
                                <div className="hospital-detail">
                                    <button className="button absolute-button r17w">병원 상세보기</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="top-title">
                                    <div className="name r20b">응급실 종합상황판</div>
                                    <button className="close-button" onClick={handleCloseDetail}>
                                        <img src={images['close16.png']} alt="닫기" />
                                    </button>
                                </div>
                                <EmergencyDetail selectedEmergency={selectedEmergency} region={region} />
                            </>
                        )
                    ) : (
                        <div>선택된 응급실 정보가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
export default Emergency;