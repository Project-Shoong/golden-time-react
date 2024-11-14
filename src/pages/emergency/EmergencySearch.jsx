import { images } from "../../utils/images";

const EmergencySearch = () => {
    return (
        <div className="search-boxes">
            <div className="select-boxs r15b">
                <select name="sido" id="sido">
                    <option value="">시/도 선택</option>
                </select>
                <select name="sidogun" id="sidogun">
                    <option value="">시/도/군 선택</option>
                </select>
            </div>
            <div className="search-box">
                <input className="input r15d" type="text" placeholder="응급실종류, 응급실명 검색" name="" id="" />
                <button className="search-button">
                    <img src={images['search19_w.png']} alt="검색" />
                </button>
            </div>
        </div>
    )
};
export default EmergencySearch;