import axios from "axios";
import { images } from "../../utils/images";
import { useEffect, useState } from "react";

const EmergencyDetail = ({selectedEmergency, selectedSido, region}) => {

    const [matchedAcceptance, setAcceptance] = useState(null);
    const [matchedMessages, setMessages] = useState([]);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";
    
    const getDetailResults = async () => {
        if(!selectedEmergency) return;

        try {
            const [response1, response2] = await axios.all([
                // 중증질환자 수용가능 정보 조회 
                axios.get(`${API_BASE_URL}/getSrsillDissAceptncPosblInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        STAGE1: selectedSido,
                        STAGE2: region
                    },
                }),
                // 응급실 메시지 조회
                axios.get(`${API_BASE_URL}/getEmrrmSrsillDissMsgInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        Q0: selectedSido,
                        Q1: region
                    },
                }),
            ])

            // 데이터 잘 받고 있니?
            console.log("selectedEmergency ! 넌 어떤 데이터를 가지고 있니", selectedEmergency);
            
            // 각 상태에 데이터 저장
            const acceptance = response1.data?.response?.body?.items?.item || [];
            const messages = response2.data?.response?.body?.items?.item || [];
            
            // 선택된 응급실 여부 일치
            const matchedAcceptance = acceptance.find((item) => item.hpid === selectedEmergency.hpid);
            const matchedMessages = messages.filter((item) => item.hpid === selectedEmergency.hpid);
            
            setAcceptance(matchedAcceptance);
            setMessages(matchedMessages);

            console.log("중증질환자 수용가능 정보 조회는", matchedAcceptance);
            console.log("응급실 메시지 조회는", matchedMessages);

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // selectedEmergency가 변경될 때마다 상세 데이터 요청
    useEffect(() => {
        getDetailResults();
    }, [selectedEmergency]);

    if(!selectedEmergency) {
        return <div>선택된 응급실 정보가 없습니다.</div>;
    }

    return (
        <div className="emergency-detail">
            <div className="emergency-name b25mc">{selectedEmergency.dutyName}</div>
            <div className="big-item">
                <div className="title b20b">응급실</div>
                <table className="b-table">
                    <tbody>
                        <tr className="b15b">
                            <td>일반</td>
                            <td>코호트 격리</td>
                            <td>음압격리</td>
                            <td>일반격리</td>
                        </tr>
                        <tr className="b13b">
                            <td><img src={images['red_circle11.png']} alt="" /> {selectedEmergency.hvec} / {selectedEmergency.hvs01} </td>
                            <td> {selectedEmergency.hv27} / {selectedEmergency.hvs59} </td>
                            <td> {selectedEmergency.hv29} / {selectedEmergency.hvs03} </td>
                            <td> {selectedEmergency.hv30} / {selectedEmergency.hvs04} </td>
                        </tr>
                        <tr className="b15b">
                            <td>외상소생실</td>
                            <td>소아</td>
                            <td>소아음압격리</td>
                            <td>소아일반격리</td>
                        </tr>
                        <tr className="b13b">
                            <td> {} / {} </td>
                            <td> {selectedEmergency.hv28} / {selectedEmergency.hvs02} </td>
                            <td> {selectedEmergency.hv15} / {selectedEmergency.hvs48} </td>
                            <td> {selectedEmergency.hv16} / {selectedEmergency.hvs49} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="big-item">
                <div className="title b20b">입원병상</div>
                <div className="item-boxs r13b">
                    <div className="item-box">
                        <div className="sub-title r15b">중환자실</div>
                        <table className="b-table">
                            <tbody>
                                <tr>
                                    <td>일반</td>
                                    <td>음압격리</td>
                                    <td>소아</td>
                                    <td>신생아</td>
                                </tr>
                                <tr>
                                    <td> {selectedEmergency.hvicc} / {selectedEmergency.hvs17} </td>
                                    <td> {selectedEmergency.hv35} / {selectedEmergency.hvs18} </td>
                                    <td> {selectedEmergency.hv32} / {selectedEmergency.hvs09} </td>
                                    <td> {selectedEmergency.hvncc} / {selectedEmergency.hvs08} </td>
                                </tr>
                                <tr>
                                    <td>내과</td>
                                    <td>심장내과</td>
                                    <td>신경과</td>
                                    <td>화상</td>
                                </tr>
                                <tr>
                                    <td> {selectedEmergency.hv2} / {selectedEmergency.hvs06} </td>
                                    <td> {selectedEmergency.hv34} / {selectedEmergency.hvs15} </td>
                                    <td> {selectedEmergency.hvcc} / {selectedEmergency.hvs11} </td>
                                    <td> {selectedEmergency.hv8} / {selectedEmergency.hvs13} </td>
                                </tr>
                                <tr>
                                    <td>외과</td>
                                    <td>신경외과</td>
                                    <td>훙부외과</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> {selectedEmergency.hv3} / {selectedEmergency.hvs07} </td>
                                    <td> {selectedEmergency.hv6} / {selectedEmergency.hvs12} </td>
                                    <td> {selectedEmergency.hvccc} / {selectedEmergency.hvs16} </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="item-box">
                        <div className="sub-title r15b">응급전용</div>
                        <table className="b-table">
                            <tbody>
                                <tr>
                                    <td>입원실</td>
                                    <td>입원실 음압격리</td>
                                    <td>입월실 일반격리</td>
                                    <td>중환자실</td>
                                </tr>
                                <tr>
                                    <td> {selectedEmergency.hv36} / {selectedEmergency.hvs19} </td>
                                    <td> {} / {} </td>
                                    <td> {} / {} </td>
                                    <td> {selectedEmergency.hv31} / {selectedEmergency.hvs05} </td>
                                </tr>
                                <tr>
                                    <td>중환자실 음압격리</td>
                                    <td>중환자실 일반격리</td>
                                    <td>소아입원실</td>
                                    <td>소아중환자실</td>
                                </tr>
                                <tr>
                                    <td> {} / {selectedEmergency.hvs50 } </td>
                                    <td> {} / {selectedEmergency.hvs51 } </td>
                                    <td> {selectedEmergency.hv37} / {selectedEmergency.hvs20} </td>
                                    <td> {selectedEmergency.hv33} / {selectedEmergency.hvs10} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="item-box">
                        <div className="sub-title r15b">외상전용</div>
                            <table className="b-table">
                                <tbody>
                                    <tr>
                                        <td>중환자실</td>
                                        <td>입원실</td>
                                        <td>수술실</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> {} / {} </td>
                                        <td> {} / {} </td>
                                        <td> {} / {} </td>
                                        <td> {} / {} </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="item-box">
                        <div className="sub-title r15b">입원실/기타</div>
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
                                    <td> {selectedEmergency.hvgc} / {selectedEmergency.hvs38} </td>
                                    <td> {selectedEmergency.hv41} / {selectedEmergency.hvs25} </td>
                                    <td> {selectedEmergency.hv40} / {selectedEmergency.hvs24} </td>
                                    <td> {selectedEmergency.hvoc} / {selectedEmergency.hvs22} </td>
                                </tr>
                                <tr>
                                    <td>[기타] 분만실</td>
                                    <td>[기타] 화장전용처치실</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> {selectedEmergency.hv42 } / {selectedEmergency.hvs26} </td>
                                    <td> {selectedEmergency.hv43} / {selectedEmergency.hvs36} </td>
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
                <div className="title b20b">중증응급질환</div>
                <table className="b-table r15b">
                    {
                        matchedAcceptance?.MKioskTy1 ? (
                        <tbody>
                            <tr>
                                <td>[재관류중재술] 심근경색</td>
                                <td>[재관류중재술] 뇌경색</td>
                                <td>[뇌출혈수술] 거미막하출혈</td>
                                <td>[뇌출혈수술] 거미막하출혈 외</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy1} </td>
                                <td> {matchedAcceptance.MKioskTy2} </td>
                                <td> {matchedAcceptance.MKioskTy3} </td>
                                <td> {matchedAcceptance.MKioskTy4} </td>
                            </tr>
                            <tr>
                                <td>[대동맥응급] 흉부</td>
                                <td>[대동맥응급] 복부</td>
                                <td>[담낭담관질환] 담낭질환</td>
                                <td>[담낭담관질환] 담도포함질환</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy5} </td>
                                <td> {matchedAcceptance.MKioskTy6} </td>
                                <td> {matchedAcceptance.MKioskTy7} </td>
                                <td> {matchedAcceptance.MKioskTy8} </td>
                            </tr>
                            <tr>
                                <td>[복부응급수술] 비외상</td>
                                <td>[장중첩/폐색] 영유아</td>
                                <td>[사지접합] 수족지접합</td>
                                <td>[사지접합] 수족지접합 외</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy9} </td>
                                <td> {matchedAcceptance.MKioskTy10} </td>
                                <td> {matchedAcceptance.MKioskTy20} </td>
                                <td> {matchedAcceptance.MKioskTy21} </td>
                            </tr>
                            <tr>
                                <td>[응급내시경] 성인 위장관</td>
                                <td>[응급내시경] 영유아 위장관</td>
                                <td>[응급내시경] 성인 기관지</td>
                                <td>[응급내시경] 영유아 기관지</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy11} </td>
                                <td> {matchedAcceptance.MKioskTy12} </td>
                                <td> {matchedAcceptance.MKioskTy13} </td>
                                <td> {matchedAcceptance.MKioskTy14} </td>
                            </tr>
                            <tr>
                                <td>[산부인과응급] 분만</td>
                                <td>[산부인과응급] 산과수술</td>
                                <td>[산부인과응급] 부인과수술</td>
                                <td>[저체중출생아] 집중치료</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy16} </td>
                                <td> {matchedAcceptance.MKioskTy17} </td>
                                <td> {matchedAcceptance.MKioskTy18} </td>
                                <td> {matchedAcceptance.MKioskTy15} </td>
                            </tr>
                            <tr>
                                <td>[응급투석] HD</td>
                                <td>[응급투석] CRRT</td>
                                <td>[영상의학혈관중재] 성인</td>
                                <td>[영상의학혈관중재] 영유아</td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy22} </td>
                                <td> {matchedAcceptance.MKioskTy23} </td>
                                <td> {matchedAcceptance.MKioskTy26} </td>
                                <td> {matchedAcceptance.MKioskTy27} </td>
                            </tr>
                            <tr>
                                <td>[정신과적응급] 폐쇄병동입원</td>
                                <td>[중증화상] 전문치료</td>
                                <td>[안과적수술] 응급</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td> {matchedAcceptance.MKioskTy24} </td>
                                <td> {matchedAcceptance.MKioskTy19} </td>
                                <td> {matchedAcceptance.MKioskTy25} </td>
                                <td></td>
                            </tr>
                        </tbody>
                        ) : (
                            <tr>
                                <td colSpan="4">중증질환자 정보가 없습니다.</td>
                            </tr>
                        )
                    }
                </table>
            </div>
            <div className="big-item">
                <div className="title b20b">장비정보</div>
                <table className="b-table r15b">
                    <tbody>
                        <tr>
                            <td>인공호흡기 일반</td>
                            <td>인공호흡기 조산아</td>
                            <td>인큐베이터</td>
                            <td>CRRT</td>
                        </tr>
                        <tr>
                            <td> {selectedEmergency.hvventiayn} / {selectedEmergency.hvs30} </td>
                            <td> {selectedEmergency.hvventisoayn} / {selectedEmergency.hvs31} </td>
                            <td> {selectedEmergency.hvincuayn} / {selectedEmergency.hvs32} </td>
                            <td> {selectedEmergency.hvcrrtayn} / {selectedEmergency.hvs33} </td>
                        </tr>
                        <tr>
                            <td>ECMO</td>
                            <td>중심체온조절유도기</td>
                            <td>고압산소치료기</td>
                            <td>CT</td>
                        </tr>
                        <tr>
                            <td> {selectedEmergency.hvecmoayn} / {selectedEmergency.hvs34} </td>
                            <td> {selectedEmergency.hvhypoayn} / {selectedEmergency.hvs35} </td>
                            <td> {selectedEmergency.hvoxyayn} / {selectedEmergency.hvs37} </td>
                            <td> {selectedEmergency.hvctayn} / {selectedEmergency.hvs27} </td>
                        </tr>
                        <tr>
                            <td>MRI</td>
                            <td>혈관촬영기</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td> {selectedEmergency.hvmriayn} / {selectedEmergency.hvs28} </td>
                            <td> {selectedEmergency.hvangioayn} / {selectedEmergency.hvs29} </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="big-item">
                <div className="title b20b">응급실 / 진료불가능 메시지</div>
                <div className="e-message">
                    <div className="sub-title r15mc">응급실 메시지</div>
                    <table className="b-table m-table r15b">
                        <thead>
                            <tr>
                                <th>메시지 내용</th>
                                <th>등록일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matchedMessages.length > 0 ? (
                                    matchedMessages.map((msg, index) => (
                                        <tr key={index}>
                                            <td>{msg.symBlkMsg || "메시지 없음"}</td>
                                            <td>{msg.symBlkSttDtm || "날짜 없음"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">응급실 메시지가 없습니다.</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="un-message">
                    <div className="sub-title r15f0">진료불가능 메시지</div>
                    <table className="b-table m-table r15b">
                        <tbody>
                            <tr>
                                <td>[중증화상] 인력부족 등록일시 : 2024-11-07 00:00:00</td>
                                <td> {} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="hospital-detail">
                <button className="button r17w">병원 상세보기</button>
            </div>
        </div>
    )
}
export default EmergencyDetail;