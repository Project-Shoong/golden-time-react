import {useEffect, useState} from 'react';
import '../../assets/style/pharmacy.css';
import { images } from '../../utils/images';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const Medicine = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const medicinesPerPage = 10;
    const totalPages = Math.ceil(results.length / medicinesPerPage);

    const API_BASE_URL = "https://apis.data.go.kr/1471000";

    // 의약품 api
    const getMedicines = async () => {

        try {
            const [response1, response2] = await axios.all([
                // 의약품 낱알식별 정보
                axios.get(`${API_BASE_URL}/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        pageNo: 1,
                        numOfRows: 200,
                        type: "json"
                    },
                }),
                // 의약품개요정보(e약은요)
                axios.get(`${API_BASE_URL}/DrbEasyDrugInfoService/getDrbEasyDrugList`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        pageNo: 1,
                        numOfRows: 200,
                        type: "json"
                    },
                }),
            ]);

            const medi1 = response1.data?.body?.items || [];
            const medi2 = response2.data?.body?.items || [];

            // 데이터 병합
            const medicineData = medi2.map((medi2Item) => {
                const matchedItem = medi1.find((m) => String(m.ITEM_SEQ) === String(medi2Item.itemSeq));
                if(matchedItem) {
                    return {...medi2Item, ...matchedItem, isMatched: true};
                } else {
                    return {...medi2Item, isMatched: false};
                }
            });
            medi1.forEach((medi1Item) => {
                const isMatched = medi2.some((medi2Item) => String(medi2Item.itemSeq) === String(medi1Item.ITEM_SEQ));
                if(!isMatched) {
                    medicineData.push({...medi1Item, isMatched: false});
                }
            });

            setData(medicineData);
            setFilteredData(medicineData);

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // 검색어
    const handleInputChange = (e) => {
        const keyword = e.target.value;
        setQuery(keyword);

        // 검색어를 기반으로 데이터 필터링 
        if(keyword.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((medicineData) => 
            medicineData.ITEM_NAME?.includes(keyword) 

            );
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        getMedicines();
    }, []);

    return (
        <div id="medicine" className="medicine-container" >

            <div className="dsearch">
                <h2>의약품 검색</h2>
                <div className="dsearch-bar">
                    <div className="input-container">
                        <img className="search-logo" src={images['logo20.png']} alt="goldtime logo" />
                        <input 
                            type="text" 
                            placeholder="제품명/회사명 검색"
                            name="" id=""
                            value={query}
                            onChange={handleInputChange}
                        />
                        <button className="ddropdown-button">
                            <img src={images['dropdown17.png']} alt="열기" />
                        </button>
                        <button className="dsearch-button" onClick={()=> getMedicines(query)}>
                            <img src={images['search20.png']} alt="검색" />
                        </button>
                    </div>
                    <div className="dresult-items">
                        {results.map((item, index) => (
                            <div key={index} className="dresult-item">
                                <img src={images['search16.png']} alt="관련검색어" />
                                <span>검색 결과 1</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ddetail-search">
                <div className="ddetail-title">
                    <h3>의약품 상세검색</h3>
                    <p>
                        상세검색에서 각 항복에 검색어를 입력한 후 검색 버튼을 클릭하면 해당 조건에 맞는 내용이 검색됩니다. 여러 항목을 동시에 검색할 수 있습니다.
                    </p>
                </div>
                <form action="">
                    <div className="dform-row">
                        <label>제품명<br />(한글/영문)</label>
                        <input type="text" name="" id="" />
                        <label>성분명<br />(한글/영문)</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="dform-row">
                        <label>회사명</label>
                        <input type="text" name="" id="" />
                        <label>효능효과</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="dform-row checkbox">
                        <label>구분</label>
                        <div className="check">
                            <input type="checkbox" name="" id="전체" />
                            <label htmlFor="전체">전체</label>
                            <input type="checkbox" name="" id="일반" />
                            <label htmlFor="일반">일반</label>
                            <input type="checkbox" name="" id="전문" />
                            <label htmlFor="전문">전문</label>
                        </div>
                        <label>제형</label>
                        <select name="" id="">
                            <option value="전체">전체</option>
                            <option value="정제">정제</option>
                            <option value="캡슐">캡슐</option>
                            <option value="정제">가글액체</option>
                            <option value="정제">건조시럽</option>
                            <option value="정제">경피흡수제</option>
                        </select>
                    </div>
                    <div className="dbutton-row">
                        <button type="reset" className="dreset-button">초기화</button>
                        <button type="submit" className="dsubmit-button">검색</button>
                    </div>
                </form>
            </div>

            <div className="dresult">
                <div className="result-header">
                    <h3>검색결과 리스트</h3>
                    <span className="reault-count">총 {results.length}개</span>
                </div>
                <table className="dtable">
                    <thead>
                        <tr>
                            <th>식별표시</th>
                            <th>제품명</th>
                            <th>성분/함량</th>
                            <th>회사명</th>
                            <th>제형</th>
                            <th>구분</th>
                            <th></th>
                        </tr>
                    </thead>
                    {results.length > 0 ? (
                        <tbody>
                                <>
                                    <tr>
                                        <td><img className='pill-image' src="" alt="pill" /></td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td className='accordion-cell'>
                                            <img src={images['dropdown17.png']} alt="열기" />
                                        </td>
                                    </tr>
                                    {/* 아코디언 내용 행 */}
                                    <tr className="accordion-content no-hover">
                                        <td colSpan="7">
                                            <div className="medicine-details">
                                                <h4>제품 기본정보</h4>
                                                <div className="medicine-item">
                                                    <div className="medicine-left">
                                                        <div className="medicine-info">
                                                            <p><strong>제품명</strong>{}</p>
                                                            <p><strong>성분/함량</strong>{}</p>
                                                            <p><strong>품목일련번호</strong>{}</p>
                                                            <p><strong>전문/일반</strong>{}</p>
                                                            <p><strong>제조/수입사</strong>{}</p>
                                                            <p><strong>제형</strong>{}</p>
                                                            <p><strong>의약품 모양</strong>{}</p>
                                                        </div>
                                                        <div className="medicine-info">
                                                            <p><strong>제품영문명</strong>{}</p>
                                                            <p><strong>색깔</strong>{}</p>
                                                            <p><strong>품목허가일자</strong>{}</p>
                                                            <p><strong>성상</strong>{}</p>
                                                            <p><strong>분류번호</strong>{}</p>
                                                            <p><strong>분류명</strong>{}</p>
                                                            <p><strong>효능/효과</strong>{}</p>
                                                        </div>
                                                    </div>
                                                    <div className="medicine-right">
                                                        <img className='pill-detail-image' src="" alt="pill"  />
                                                        <table className="dimension-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>장축(mm)</th>
                                                                    <th>단축(mm)</th>
                                                                    <th>두께(mm)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{}</td>
                                                                    <td>{}</td>
                                                                    <td>{}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                        </tbody>
                    ) : (
                        <p colSpan="7" align="center" className="no-results r17b">검색된 결과가 없습니다.</p>
                    )}
                </table>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}
export default Medicine;