import { useState } from 'react';
import '../../assets/styles/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

const Emergency = ()=>{
    // 응급실 검색 결과를 저장하는 배열로, searchResults 상태 변수를 선언
    const [searchResults, setSearchResults] = useState([]);

    // 검색 핸들러 get 요청을 보내며, params 객체로 검색조건들을 전달
    const handleSearch = async (selectedSido, selectedRegion, searchTerm) => {
        try {
            const response = await axios.get('http://localhost:8080/api/emergency-beds', {
                sido: selectedSido,
                sigungu: selectedRegion,
                name: searchTerm
            });
            // 응답 받은 데이터를 상태 변수에 저장하여 검색 결과로 표시
            setSearchResults(response.data);
        } catch (error) {
            console.log("api 호출 중 에러 발생: ", error);
        }
    }

    return (
        <div id="emergency" className="emergency-container">

            <div className="sidebar scroll">
                {/* EmergencySearch를 렌더링하여 onSearch라는 이름으로 handleSearch 함수를 전달
                검색조건을 입력하고 버튼을 클릭하면, onSearch 함수를 호출하여 조건에 맞는 데이터를 가져옴 */}
                <EmergencySearch onSearch={handleSearch} />
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