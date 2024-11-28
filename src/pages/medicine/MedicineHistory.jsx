import { useState } from "react"
import { images } from '../../utils/images';

const MedicineHistory = ({ onSearch }) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 최신 검색어 추가, 7개 제한
    const handleSearch = (searchTerm) => {
        setSearchHistory((prevHistory) => {
            const updatedHistory = [searchTerm, ...prevHistory.filter(term => term != searchTerm)];
            return updatedHistory.slice(0, 7);
        });

        onSearch(searchTerm);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <input 
                type="text" 
                placeholder="제품명 검색"
                name="" id=""
                onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        handleSearch(e.target.value);
                        e.target.value = ""; // 검색 후 초기화
                    }
                }}
            />
            <button className="ddropdown-button" onClick={toggleDropdown}>
                <img src={images['dropdown17.png']} alt="열기" />
            </button>
            <button className="dsearch-button" onClick={handleSearch}>
                <img src={images['search20.png']} alt="검색" />
            </button>

            {isDropdownOpen && (
                <div className="dresult-items">
                    {searchHistory.map((item, index) => (
                        <div key={index} className="dresult-item" onClick={() => handleSearch(item)}>
                            <img src={images['search16.png']} alt="관련검색어" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
export default MedicineHistory;