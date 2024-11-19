import { useState } from 'react';
import '../../assets/styles/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

const Emergency = ()=>{

    const [searchResults, setSearchResults] = useState([]);
    const [detailData, setDetailData] = useState(null);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";

    const getSearchResults = async ({sido, region}) => {
        await axios
            .all([
                // 응급실 실시간 가용병상정보 조회
                axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        STAGE1: sido,
                        STAGE2: region,
                    },
                }),
                // 기관 정보 
                axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        Q0: sido,
                        Q1: region,
                    },
                }),
            ])
            .then(
                axios.spread((response1, response2) => {
                    // 응답 데이터 추출
                    const data1 = response1.data.response.body.items.item;
                    const data2 = response2.data.response.body.items.item;
                    // 병합
                    const combinedResults = [...data1, ...data2];
                })
            )
            .catch((error) => {
                console.error("api 요청 실패: ", error);
            });
    };

    return (
        <div id="emergency" className="emergency-container">

            <div className="sidebar scroll">
                <EmergencySearch onSearch={getSearchResults} />
                <div className="total-count r15b">총 {searchResults.length} 건</div>
                <EmergencyList results={searchResults} />
            </div>

            <div className="situation-board scroll">
                <div className="top-title">
                    <div className="name r20b">응급실 종합상황판</div>
                    <img src={images['close16.png']} alt="" />
                </div>
                <EmergencyDetail />
            </div>
            
            <div className="emergency-map">
                <p>지도영역(api이용하기)</p> 
            </div>

        </div>
    );
}
export default Emergency;