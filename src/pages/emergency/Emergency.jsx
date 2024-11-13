import '../../assets/styles/emergency.css';
import search19_w from '../../assets/images/search19_w.png'
import map15 from '../../assets/images/map15.png'
import phone15 from '../../assets/images/phone15.png'
import sickbed15 from '../../assets/images/sickbed15.png'
import red_circle11 from '../../assets/images/red_circle11.png'
import yellow_circle11 from '../../assets/images/yellow_circle11.png'
import green_circle11 from '../../assets/images/green_circle11.png'
import close_button15 from '../../assets/images/close_button15.png'

const Emergency = ()=>{
    return (
        <div id="emergency" className="emergency-container">

            <div className="sidebar">
                <div className="search-boxes">
                    <div className="select-boxs">
                        <select name="" id="">
                            <option value="">시/도 선택</option>
                            <option value="">서울</option>
                        </select>
                        <select name="" id="">
                            <option value="">시/도/군 선택</option>
                        </select>
                    </div>
                    <div className="search-box">
                        <input className="input" type="text" placeholder="응급실종류, 응급실명 검색" name="" id="" />
                        <button className="search-button">
                            <img src={search19_w} alt="검색" />
                        </button>
                    </div>
                </div>
                <div className="total-count">총 119 건</div>
                <div className="list">
                    <div className="title">
                        <div className="name">강남세브란스병원 응급진료센터</div>
                        <div className="gray-name">응급실</div>
                    </div>
                    <div className="address-box acg9">
                        <img src={map15} alt="" />
                        <div className="address">서울 강남구 언주로 211</div>
                    </div>
                    <div className="phone-box acg9">
                        <img src={phone15} alt="" />
                        <div className="phone">01-2019-3333</div>
                    </div>
                    <div className="sickbed-box acg9">
                        <img src={sickbed15} alt="" />
                        <div className="sickbed">병상수</div>
                        <div className="subsickbed">(가용병상수/기준병상수)</div>
                    </div>
                    <table className='s-table'>
                        <thead>
                            <tr>
                                <th>일반</th>
                                <th>코호트 격리</th>
                                <th>음압격리</th>
                                <th>일반격리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 병상수를 기준으로 circle의 색상 다르게 */}
                            <tr>
                                <td><img src={red_circle11} alt="" /> -7 / 15</td>
                                <td></td>
                                <td><img src={green_circle11} alt="" /> 0 / 1</td>
                                <td><img src={yellow_circle11} alt="" /> 1 / 2</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='s-table'>
                        <thead>
                            <tr>
                                <th>외상소생실</th>
                                <th>소아</th>
                                <th>소아음압격리</th>
                                <th>소아일반격리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>1 / 2</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="situation-board">
                <div className="top-title">
                    <div className="name">응급실 종합상황판</div>
                    <img src={close_button15} alt="" />
                </div>
                <div className="emergency-name">강남세브란스병원 응급진료센터</div>
                <div className="big-item">
                    <div className="title">응급실</div>
                    <table className="b-table">
                        <tbody>
                            <tr>
                                <td>일반</td>
                                <td>코호트 격리</td>
                                <td>음압격리</td>
                                <td>일반격리</td>
                            </tr>
                            <tr>
                                <td><img src={red_circle11} alt="" /> -7 / 15</td>
                                <td></td>
                                <td><img src={green_circle11} alt="" /> 0 / 1</td>
                                <td><img src={yellow_circle11} alt="" /> 1 / 2</td>
                            </tr>
                            <tr>
                                <td>외상소생실</td>
                                <td>소아</td>
                                <td>소아음압격리</td>
                                <td>소아일반격리</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>1 / 2</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="big-item">
                    <div className="title">입원병상</div>
                    <div className="item-boxs">
                        <div className="item-box">
                            <div className="sub-title">중환자실</div>
                            <table className="b-table">
                                <tbody>
                                    <tr>
                                        <td>일반</td>
                                        <td>음압격리</td>
                                        <td>소화</td>
                                        <td>신생아</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>내과</td>
                                        <td>심장내과</td>
                                        <td>신경과</td>
                                        <td>화상</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>외과</td>
                                        <td>신경외과</td>
                                        <td>훙부외과</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="item-box">
                            <div className="sub-title">응급전용</div>
                            <table className="b-table">
                                <tbody>
                                    <tr>
                                        <td>입원실</td>
                                        <td>입원실 음압격리</td>
                                        <td>입월실 일반격리</td>
                                        <td>중환자실</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>중환자실 음압격리</td>
                                        <td>중환자실 일반격리</td>
                                        <td>소아입원실</td>
                                        <td>소아중환자실</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="item-box">
                            <div className="sub-title">외상전용</div>
                                <table className="b-table">
                                    <tbody>
                                        <tr>
                                            <td>중환자실</td>
                                            <td>입원실</td>
                                            <td>수술실</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div className="item-box">
                            <div className="sub-title">입원실/기타</div>
                            <div>
                            <table className="b-table">
                                <tbody>
                                    <tr>
                                        <td>[입원실] 일반</td>
                                        <td>[입원실] 음압격리</td>
                                        <td>[입월실] 정신과 폐쇄병동</td>
                                        <td>[기타] 수술실</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>[기타] 분만실</td>
                                        <td>[기타] 화장전용처치실</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
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
                </div>
                <div className="big-item">
                    <div className="title">중증응급질환</div>
                    <table className="b-table">
                        <tbody>
                            <tr>
                                <td>[재관류중재술] 심근경색</td>
                                <td>[재관류중재술] 뇌경색</td>
                                <td>[뇌출혈수술] 거미막하출혈</td>
                                <td>[뇌출혈수술] 거미막하출혈 외</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[대동맥응급] 흉부</td>
                                <td>[대동맥응급] 복부</td>
                                <td>[담낭담관질환] 담낭질환</td>
                                <td>[담낭담관질환] 담도포함질환</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[복부응급수술] 비외상</td>
                                <td>[장중첩/폐색] 영유아</td>
                                <td>[사지접합] 수족지접합</td>
                                <td>[사지접합] 수족지접합 외</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[응급내시경] 성인 위장관</td>
                                <td>[응급내시경] 영유아 위장관</td>
                                <td>[응급내시경] 성인 기관지</td>
                                <td>[응급내시경] 영유아 기관지</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[산부인과응급] 분만</td>
                                <td>[산부인과응급] 산과수술</td>
                                <td>[산부인과응급] 부인과수술</td>
                                <td>[저체중출생아] 집중치료</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[응급투석] HD</td>
                                <td>[응급투석] CRRT</td>
                                <td>[영상의학혈관중재] 성인</td>
                                <td>[영상의학혈관중재] 영유아</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>[정신과적응급] 폐쇄병동입원</td>
                                <td>[중증화상] 전문치료</td>
                                <td>[안과적수술] 응급</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="big-item">
                    <div className="title">장비정보</div>
                    <table className="b-table">
                        <tbody>
                            <tr>
                                <td>인공호흡기 일반</td>
                                <td>인공호흡기 조산아</td>
                                <td>인큐베이터</td>
                                <td>CRRT</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>ECMO</td>
                                <td>중심체온조절유도기</td>
                                <td>고압산소치료기</td>
                                <td>CT</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>MRI</td>
                                <td>혈관촬영기</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="big-item">
                    <div className="title">응급실 / 진료불가능 메시지</div>
                    <div className="e-message">
                        <div className="sub-title">응급실 메시지</div>
                        <table className="b-table m-table">
                            <tbody>
                                <tr>
                                    <td>피부과 전문의 부재로 진료 불가 등록일시 : 2024-11-07 08:40:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="un-message">
                        <div className="sub-title">진료불가능 메시지</div>
                        <table className="b-table m-table">
                            <tbody>
                                <tr>
                                    <td>[중증화상] 인력부족 등록일시 : 2024-11-07 00:00:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="hospital-button">
                    <button className="detail-button">병원 상세보기</button>
                </div>
            </div>
            
            <div className="emergency-map">
                <p>지도영역(api이용하기)</p> 
            </div>

        </div>
    );
}
export default Emergency;