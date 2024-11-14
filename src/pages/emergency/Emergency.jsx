import { useState } from 'react';
import '../../assets/styles/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

const Emergency = ()=>{
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (selectedSido, selectedRegion, searchTerm) => {
        try {
            const response = await axios.get('백엔드url', {
                params: {
                    sido: selectedSido,
                    sidogun: selectedRegion,
                    name: searchTerm
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.log("api 호출 중 에러 발생: ", error);
        }
    }

    return (
        <div id="emergency" className="emergency-container">

            <div className="sidebar scroll">
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