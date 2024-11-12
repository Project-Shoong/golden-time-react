import search19_w from '../../assets/images/search19_w.png'

const Emergency = ()=>{
    return (
        <div id="emergency" className="emergency-container">
            <div className="sidebar">
                <div className="search-boxes">
                    <div className="select-boxs">
                        <select name="" id="">
                            <option value="general01">시/도 선택</option>
                        </select>
                        <select name="" id="">
                            <option value="general01">시/도/군 선택</option>
                        </select>
                    </div>
                    <div className="search-box">
                        <input type="text" placeholder="응급실종류, 응급실명 검색" name="" id="" />
                        <button className="search-button">
                            <img src={search19_w} alt="검색" />
                        </button>
                    </div>
                </div>
                <div className="total-count">
                    총 119 건
                </div>
                <div className="list">
                    <div className="title">
                        <div className="name"></div>
                        <div className="gray-name">응급실</div>
                    </div>
                    <div className="address-box">
                        <img src="" alt="" />
                        <div className="address"></div>
                    </div>
                    <div className="phone-box">
                        <img src="" alt="" />
                        <div className="phone"></div>
                    </div>
                    <div className="sickbed-box">
                        <img src="" alt="" />
                        <div className="sickbed"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>일반</th>
                                    <th>코호트 격리</th>
                                    <th>음압격리</th>
                                    <th>일반격리</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="emergency-map">
                <p>지도영역(api이용하기)</p> 
{/* 
                    <div id="daumRoughmapContainer1731399305860" class="root_daum_roughmap root_daum_roughmap_landing"></div>

                    <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

                    <script charset="UTF-8">
                        new daum.roughmap.Lander({
                            "timestamp" : "1731399305860",
                            "key" : "2m7sk",
                            "mapWidth" : "640",
                            "mapHeight" : "360"
                        }).render();
                    </script> */}
            </div>
        </div>
    );
}
export default Emergency;