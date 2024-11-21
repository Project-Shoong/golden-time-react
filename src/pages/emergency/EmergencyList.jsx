import React from "react";
import { images } from "../../utils/images";

const EmergencyList = ({results, onClick}) => {
    if(!results || results.length === 0) {
        return <div className="list">표시할 데이터가 없습니다.</div>;
    }

    return (
        <>
            {
                results.map((item, index) => (
                    <div className="list" key={`list-${index}`}>
                        <div className="list-item" key={`list-item-${index}`} onClick={() => onClick(item)}>
                            <div className="title">
                                <div className="name r18mc">{item.dutyName}</div>
                                <div className="gray-name r158">{item.dutyEmclsName || "응급실"}</div>
                            </div>
                            <div className="address-box acg9 r15b">
                                <img src={images['main_icon_place.png']} alt="" />
                                <div className="address">{item.dutyAddr || "주소 정보 없음"}</div>
                            </div>
                            <div className="phone-box acg9 r15b">
                                <img src={images['main_icon_tel.png']} alt="" />
                                <div className="phone">{item.dutyTel3 || "전화번호 정보 없음"}</div>
                            </div>
                            <div className="sickbed-box acg9 r15b">
                                <img src={images['sickbed15.png']} alt="" />
                                <div className="sickbed">병상수</div>
                                <div className="subsickbed r128">(가용병상수/기준병상수)</div>
                            </div>
                        </div>
                        {
                            item.hvec && (
                            <>
                                <table className="s-table">
                                    <thead className="r13w">
                                        <tr>
                                            <th>일반</th>
                                            <th>코호트 격리</th>
                                            <th>음압격리</th>
                                            <th>일반격리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><img src={images['red_circle11.png']} alt="" /> {item.hvec} / {item.hvs01} </td>
                                            <td> {item.hv27} / {item.hvs59} </td>
                                            <td> {item.hv29} / {item.hvs03} </td>
                                            <td> {item.hv30} / {item.hvs04} </td>
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
                                            <td> {} / {} </td>
                                            <td> {item.hv28} / {item.hvs02} </td>
                                            <td> {item.hv15} / {item.hvs48} </td>
                                            <td> {item.hv16} / {item.hvs49} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                            )
                        }
                    </div>
                ))
            }
        </>
    )   
}
export default EmergencyList;