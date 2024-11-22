import { useState } from 'react';
import '../../assets/styles/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

const SimpleDetail = ({selectedEmergency}) => {
    return (
        <div className="simple-detail">
            <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
            <div className="hospital-detail">
                <div>종합상황판이 없어요.</div>
                <button className="button r17w">병원 상세보기</button>
            </div>
        </div>
    );
}

const Emergency = ()=>{
    const [realResults, setRealResults] = useState([]);
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [selectedSido, setSelectedSido] = useState("");
    const [region, setRegion] = useState("");
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";

    const getSearchResults = async ({selectedSido, region, keyword}) => {
        setSelectedSido(selectedSido);
        setRegion(region);

        try {
            const [response1, response2] = await axios.all([
                // 응급실 실시간 가용병상정보 조회
                axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        STAGE1: selectedSido,
                        STAGE2: region,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
                // 기관 정보 
                axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        Q0: selectedSido,
                        Q1: region,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
            ]);

            const realTime = response1.data?.response?.body?.items?.item || [];
            const organList = response2.data?.response?.body?.items?.item || [];

            // 데이터 병합
            const realData = organList.map((organItem) => {
                const realItem = realTime.find((real) => real.hpid === organItem.hpid);
                return {...organItem, ...realItem};
            })

            // keyword 기반 필터링
            const filteredData = keyword ? realData.filter((item) => 
                item.dutyName?.includes(keyword) || item.dutyAddr?.includes(keyword)
            )
            : realData;
            
            setRealResults(filteredData);

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // 클릭된 응급실
    const handleEmergencyClick = (selectedEmergency) => {
        setSelectedEmergency(selectedEmergency);
        setIsDetailOpen(true);
    }

    // // 응급실 종합상환판 보이기
    // const handleShowBoard = () => {
    //     setSelectedEmergency(null);
    // }

    // 종합상환판 닫힘
    const handleCloseDetail = () => {
        setSelectedEmergency(null);
        setIsDetailOpen(false);
    }

    return (
        <div id="emergency" className="emergency-container">

            <div className="sidebar scroll">
                <EmergencySearch onSearch={getSearchResults} />
                <div className="total-count r15b">총 {realResults.length} 건</div>
                <EmergencyList results={realResults} onClick={handleEmergencyClick} />
            </div>

            {isDetailOpen && (
                <div className={selectedEmergency?.dutyEmclsName === "응급실운영신고기관" ? "simple-detail" : "situation-board scroll"}>
                    {selectedEmergency ? ( 
                        selectedEmergency.dutyEmclsName === "응급실운영신고기관" ? (
                            <>
                                <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
                                <div className="hospital-detail">
                                    <div>종합상황판이 없어요.</div>
                                    <button className="button r17w">병원 상세보기</button>
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
                                <EmergencyDetail selectedEmergency={selectedEmergency} selectedSido={selectedSido} region={region} />
                            </>
                        )
                    ) : (
                        <div>선택된 응급실 정보가 없습니다.</div>
                    )}
                </div>
            )}
            
            <div className="emergency-map">
                <p>지도영역(api이용하기)</p> 
            </div>

        </div>
    );
}
export default Emergency;