import { images } from "../../utils/images";

const EmergencyList = ({results}) => {
    return (
        <div className="list">
            {
                results.map((item, index) => (
                    <div key={index} className="list-item">
                        <div className="title">
                            <div className="name r18mc">{item.name}</div>
                            <div className="gray-name r158">응급실</div>
                        </div>
                        <div className="address-box acg9 r15b">
                            <img src={images['main_icon_place.png']} alt="" />
                            <div className="address">{item.address}</div>
                        </div>
                        <div className="phone-box acg9 r15b">
                            <img src={images['main_icon_tel.png']} alt="" />
                            <div className="phone">{item.phone}</div>
                        </div>
                        <div className="sickbed-box acg9 r15b">
                            <img src={images['sickbed15.png']} alt="" />
                            <div className="sickbed">병상수</div>
                            <div className="subsickbed r128">(가용병상수/기준병상수)</div>
                        </div>
                        <table className="s-table">
                            <thead className="r13w">
                                <tr>
                                    <th>일반</th>
                                    <th>코호트 격리</th>
                                    <th>음압격리</th>
                                    <th>일반격리</th>
                                </tr>
                            </thead>
                            <tbody className="r13b">
                                {/* 병상수를 기준으로 circle의 색상 다르게 */}
                                <tr>
                                    <td><img src={images['red_circle11.png']} alt="" /> -7 / 15</td>
                                    <td></td>
                                    <td><img src={images['green_circle11.png']} alt="" /> 0 / 1</td>
                                    <td><img src={images['yellow_circle11.png']} alt="" /> 1 / 2</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='s-table'>
                            <thead className="r13w">
                                <tr>
                                    <th>외상소생실</th>
                                    <th>소아</th>
                                    <th>소아음압격리</th>
                                    <th>소아일반격리</th>
                                </tr>
                            </thead>
                            <tbody className="r13b">
                                <tr>
                                    <td></td>
                                    <td>1 / 2</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }
        </div>
            
    )

}
export default EmergencyList;