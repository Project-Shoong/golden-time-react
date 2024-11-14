import { images } from "../../utils/images";
import {sido, gangwon, gyeonggi, gyeongsangnam, gyeongsangbuk, gwangju, daegu, daejeon, busan, seoul, ulsan, incheon, jeonnam, jeonbuk, jeju, chungbuk, chungnam, sejong} from "../../constants/regions";
import { useState } from "react";

const EmergencySearch = ({onSearch}) => {
    const [selectedSido, setSelecetedSido] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [availableRegions, setAvailableRegions] = useState([]);

    const handleSidoChange = (e) => {
        const selected = e.target.value;
        setSelecetedSido(selected);
        setSelectedRegion("");
        
        switch (selected) {
            case "서울특별시":
                setAvailableRegions(seoul);
                break;
            case "부산광역시":
                setAvailableRegions(busan);
                break;
            case "대구광역시":
                setAvailableRegions(daegu);
                break;
            case "인천광역시":
                setAvailableRegions(incheon);
                break;
            case "광주광역시":
                setAvailableRegions(gwangju);
                break;
            case "대전광역시":
                setAvailableRegions(daejeon);
                break;
            case "울산광역시":
                setAvailableRegions(ulsan);
                break;
            case "세종특별자치시":
                setAvailableRegions(sejong);
                break;
            case "경기도":
                setAvailableRegions(gyeonggi);
                break;
            case "강원특별자치도":
                setAvailableRegions(gangwon);
                break;
            case "충청북도":
                setAvailableRegions(chungbuk);
                break;
            case "충청남도":
                setAvailableRegions(chungnam);
                break;
            case "전북특별자치도":
                setAvailableRegions(jeonbuk);
                break;
            case "전라남도":
                setAvailableRegions(jeonnam);
                break;
            case "경상북도":
                setAvailableRegions(gyeongsangbuk);
                break;
            case "경상남도":
                setAvailableRegions(gyeongsangnam);
                break;
            case "제주특별자치도":
                setAvailableRegions(jeju);
                break;
            default:
                setAvailableRegions([]);
        }
    }

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchClick = (e) => {
        onSearch(selectedSido, selectedRegion, searchTerm);
    }

    return (
        <div className="search-boxes">
            <div className="select-boxs r15b">
                <select name="sido" id="sido" onChange={handleSidoChange}>
                    <option value="">시/도 선택</option>
                    {
                        sido.map((sidoName) => (
                            <option key={sidoName} value={sidoName}>{sidoName}</option>
                        ))
                    }
                </select>
                <select name="sidogun" id="sidogun" onChange={handleRegionChange} disabled={!selectedSido}>
                    <option value="">시/도/군 선택</option>
                    {
                        availableRegions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))
                    }
                </select>
            </div>
            <div className="search-box">
                <input className="input r15b" 
                    type="text" 
                    placeholder="응급실종류, 응급실명 검색" 
                    name="emergencyName" 
                    id="emergencyName" 
                    value={searchTerm} 
                    onChange={handleSearchTermChange}
                />
                <button className="search-button" onClick={handleSearchClick}>
                    <img src={images['search19_w.png']} alt="검색" />
                </button>
            </div>
        </div>
    )
};
export default EmergencySearch;