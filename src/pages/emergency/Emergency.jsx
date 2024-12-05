import { useEffect, useRef, useState } from 'react';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';
import HospitalDetail from '../hospital/HospitalDetail';
import FindRoute from '../../components/FindRoute';

const Emergency = ()=>{
    const {Tmapv2} = window;
    const mapRef = useRef(null); //지도 객체 관리
    const markersRef = useRef([]); //마커 객체 배열 관리
    const markerImage = images['marker_emergency.png'];
    const [realResults, setRealResults] = useState([]); //검색결과
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [region, setRegion] = useState({sido:"", sigungu:""});
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isBoardDetailOpen, setIsBoardDetailOpen] = useState(false); //종합상황판 열림 여부
    const [isDetailOpen, setIsDetailOpen] = useState(false); //병원 상세보기 열림 여부
    const [selectedHospital, setSelectedHospital] = useState(null);

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
            console.log("filteredData: ", filteredData);
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
    };
    
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
    };

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





    // 종합상황판에 길찾기 버튼을 만든다. OK
    // 길찾기 버튼을 누르면 종합상황판이 닫히면서 길찾기 실행
    // 종합상황판은 조그마한 창으로 바꾸기

    const handleEmergencyClick = (filteredData) => {
        // 응급실의 위치 추출
        const lat = filteredData.wgs84Lat;
        const lon = filteredData.wgs84Lon;
        const position = new Tmapv2.LatLng(lat, lon);
        const marker = new Tmapv2.Marker({
            position: position,
            map: mapRef.current,
            icon: markerImage,
            label: filteredData.dutyName 
        });

        marker.addListener("click", function(evt) {
            mapRef.current.setCenter(position);
            mapRef.current.setZoom(10);
        });
        marker.push(marker);
    }

    const handleFindRoute = () => {

    }

    const [markers, setMarkers] = useState([]);
    const [routeLayer, setRouteLayer] = useState(null);

    // 마커 제거
    const removeMarkers = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]); 
         // 기존 마커 제거
         markersRef.current.forEach((marker) => marker.setMap(null));
         markersRef.current = [];
    };

    // 경로 제거
    const removeRouteLayer = () => {
        if(routeLayer) {
            routeLayer.setMap(null);
            setRouteLayer(null);
        }
    };

    //길찾기 API
    const getRP = async () => {
        if(startLocation && destination) {
            const requestData = {
                startX: startLocation.longitude,
                startY: startLocation.latitude, 
                endX: destination.wgs84Lon, 
                endY: destination.wgs84Lat,
                reqCoorType: "WGS84GEO", //내 요청에 제공하는 좌표형식
                resCoordType: "EPSG3857",  //api가 응답으로 반환하는 좌표형식
                searchOption: '0',
                trafficInfo: "Y",
            };
        
            const headers = {
                appKey: process.env.REACT_APP_TMAP_APP_KEY
            }
        
            try {
                const response = await axios.post ("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
                    requestData,
                    { headers: headers }
                ); 

                // 결과 데이터 처리
                const resultData = response.data.features;

                // 경로 표시
                drawRoute(resultData);
                
            } catch (error) {
                console.log("경로 요청 실패: ", error);
            }

        } else {
            console.error("현재 위치 정보를 가져올 수 없습니다.");
        }
    };

    // 경로 그리기
    const drawRoute = (routeData) => {
        const path = []; //경로 좌표 저장 배열

        // 경로 데이터를 기반으로 Polyline 생성
        routeData.forEach((item) => {
            const geometry = item.geometry;
            if(geometry.type === "LineString") {
                geometry.coordinates.forEach((coord) => {
                    // EPSG3857 좌표를 WGS84 좌표로 변환
                    const point = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        new Tmapv2.Point(coord[0], coord[1])
                    );
                    path.push(new Tmapv2.LatLng(point._lat, point._lng));
                });
            }
        });

        // Polyline 생성
        const polyline = new Tmapv2.Polyline({
            path,
            strokeColor: "#FF0000",
            strokeWeight: 4,
            map: map,
        });

        setRouteLayer(polyline);

        // 지도 중심 좌표 설정
        if(path.length > 0) {
            map.setCenter(path[0]);
            map.setZoom(14);
        }

        // 도착 마커
        if(selectedPharm) {
            const endPoint = new Tmapv2.LatLng(destination.wgs84Lat, destination.wgs84Lon);
            const endMarker = new Tmapv2.Marker({
                position: endPoint,
                map: map,
                icon: markerImage,
                label: destination.dutyName,
            });

            setMarkers((prevMarkers) => [...prevMarkers, endMarker]);
        }
    };

    // 길찾기 실행
    const handleRP = () => {
        removeMarkers(); //마커 삭제
        removeRouteLayer(); //경로 삭제
        getRP(selectedPharm); 
    };


    

    // 종합상환판 열림
    const handleOpenBoardDetail = (emergency) => {
        setSelectedEmergency(emergency);
        setIsBoardDetailOpen(true);
        setSelectedHospital(null); 
        setIsDetailOpen(false);
    };

    // 종합상환판 닫힘
    const handleCloseBoardDetail = () => {
        setSelectedEmergency(null);
        setIsBoardDetailOpen(false);
    };

    // onSearch 핸들러 - 지역/키워드 업데이트
    const handleSearch = ({region, keyword: searchKeyword }) => {
        setRegion(region);
        setSearchKeyword(searchKeyword);
        setSelectedEmergency(null);
        setIsBoardDetailOpen(false);
        setSelectedHospital(null); 
        setIsDetailOpen(false);
    };

    // 병원에 관한 것
    const getFormattedTime = (time) => {
        if (!time) return null;
        const timeStr = time.toString().padStart(4, '0');
        return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    };
    const checkOpenStatus = (hospital) => {
        const today = new Date();
        const currentDay = today.getDay() === 0 ? 7 : today.getDay();
        const currentTime = `${today.getHours().toString().padStart(2, '0')}${today.getMinutes().toString().padStart(2, '0')}`; // 현재 시간 'HHmm' 포맷

        const openTime = hospital[`dutyTime${currentDay}s`];
        const closeTime = hospital[`dutyTime${currentDay}c`];

        if (!openTime || !closeTime) {
            return { status: "오늘 휴무", open: null, close: null };
        }

        const isOpen = currentTime >= openTime && currentTime <= closeTime;

        return {
            status: isOpen ? "진료중" : "진료 종료",
            open: getFormattedTime(openTime),
            close: getFormattedTime(closeTime),
        };
    }
    const cleanHospitalName = (name) => {
        // (사), (의), "사", "의", &#40;사&#41;, &#40;의&#41; 등을 제거
        return name ? name.replace(/(\(사\)|\(의\)|"사"|"의"|&#40;사&#41;|&#40;의&#41;)/g, "").trim() : "";
    };
    const renameClassification = (dutyDivNam, dutyName) => {
        if (dutyDivNam === '의원') {
            const departmentMap = {
                '안과': '안과',
                '내과': '내과',
                '이비인후과': '이비인후과',
                '성형외과': '성형외과',
                '정형외과': '정형외과',
                '피부과': '피부과'
            };
            for (const [key, value] of Object.entries(departmentMap)) {
                if (dutyName.includes(key)) {
                    return value;
                }
            }
            return '';
        }
        return dutyDivNam;
    };
    const handleEmergencyToHospital = () => {
        fetchHospitalDetail(selectedEmergency);
    };
    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedHospital(null);
    };
    const fetchHospitalDetail = async (selectedEmergency) => {
        // 이미 로드된 병원인지 확인
        if (selectedHospital?.hpid === selectedEmergency.hpid) {
            setIsDetailOpen(true); 
            return;
        }

        const apiUrl = "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;
        const hpid = selectedEmergency.hpid;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );

            const result = response?.data?.response?.body?.items?.item || null;

            if (!result) {
                console.error("API에서 병원 데이터를 가져오지 못했습니다.");
                return;
            }

            setSelectedHospital(Array.isArray(result) ? result[0] : result); 
            setIsDetailOpen(true);
            
        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    return (
        <div id="emergency" className="emergency-container">
            <div id="map_div" className="map-background" ></div>
            <div className="sidebar">
                <EmergencySearch onSearch={handleSearch} />
                <div className="total-count r15b">총 {realResults.length} 건</div>
                <div className="scroll">
                    <EmergencyList 
                        results={realResults} 
                        onClick={handleOpenBoardDetail} />
                </div>
            </div>

            {/* 종합상황판 */}
            {isBoardDetailOpen ? (
                selectedEmergency ?.dutyEmclsName === "응급실운영신고기관" ? (
                    <div className="simple-detail">
                        <div className="non-title">
                            <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
                            <button className="close-button right-0" onClick={handleCloseBoardDetail}>
                                <img src={images['close16.png']} alt="닫기" />
                            </button>
                        </div>
                        <div>현재 제공되는 종합상황판이 없습니다.</div>
                        <div className="hospital-detail">
                            <button className="button absolute-button r17w"
                                onClick={handleEmergencyToHospital}>병원 상세보기
                            </button>
                            {/* <FindRoute 
                                startLocation={startLocation}
                                destination={destination}
                                map={map}
                                markerImage={markerImage}
                            >
                                <div style={{ color: "red", cursor: "pointer" }}>
                                    <span>응급실 경로</span>
                                </div>
                            </FindRoute> */}
                        </div>
                    </div>
                    ) : (
                    <div className="situation-board scroll">
                        <div className="top-title">
                            <div className="name r20b">응급실 종합상황판</div>
                            <button className="close-button" onClick={handleCloseBoardDetail}>
                                <img src={images['close16.png']} alt="닫기" />
                            </button>
                        </div>
                        <EmergencyDetail 
                            selectedEmergency={selectedEmergency} 
                            region={region}
                            onHospitalDetail={handleEmergencyToHospital}
                            onFindRoute={handleFindRoute} />
                    </div>
                    )
            ) : (
                <div>선택된 응급실 정보가 없습니다.</div>
            )}
            
            {/* 병원 상세정보 */}
            {isDetailOpen && selectedHospital && (
                <HospitalDetail
                    isDetailOpen={isDetailOpen}
                    selectedHospital={selectedHospital}
                    onClose={handleCloseDetail}
                    getFormattedTime={getFormattedTime}
                    checkOpenStatus={checkOpenStatus}
                    cleanHospitalName={cleanHospitalName}
                    renameClassification={renameClassification}
                />
            )}
        </div>
    );
}
export default Emergency;