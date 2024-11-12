import {useState} from 'react';
import '../../assets/styles/pharmacy.css';
import Pagination from '../../components/Pagination';
import dropdown17 from '../../assets/images/dropdown17.png';
import logo20 from '../../assets/images/logo20.png';
import search20 from '../../assets/images/search20.png';
import search18 from '../../assets/images/search18.png';

const Medicine = () => {
    // 더미 데이터
    const dummyDrugs = Array.from({ length: 100 }, (_, index) => ({
        image: "https://via.placeholder.com/50", // 이미지 더미 URL
        name: `제품명 ${index + 1}`,
        ingredient: `성분 ${index + 1}`,
        company: `회사 ${index + 1}`,
        form: `제형 ${index + 1}`,
        type: index % 2 === 0 ? '일반' : '전문'
    }));

    const [drugs, setDrugs] = useState(dummyDrugs);
    const [currentPage, setCurrentPage] = useState(1);
    const drugsPerPage = 10;
    const totalPages = Math.ceil(drugs.length / drugsPerPage);

    return (
        <div id="drug" className="drug-container" >

            <div className="dsearch">
                <h2>의약품 검색</h2>
                <div className="dsearch-bar">
                    <div className="input-container">
                        <img className="search-logo" src={logo20} alt="goldtime logo" />
                        <input type="text" placeholder="제품명/회사명 검색" name="" id="" />
                        <button className="ddropdown-button">
                            <img src={dropdown17} alt="열기" />
                        </button>
                        <button className="dsearch-button">
                            <img src={search20} alt="검색" />
                        </button>
                    </div>
                    <div className="dresult-items">
                        <div className="dresult-item">
                            <img src={search18} alt="관련검색어" />
                            <span>검색 결과 1</span>
                        </div>
                        <div className="dresult-item">
                            <img src={search18} alt="관련검색어" />
                            <span>검색 결과 2</span>
                        </div>
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
                    <span className="reault-count">총 {drugs.length}개</span>
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
                    <tbody>
                        {drugs.slice((currentPage - 1) * drugsPerPage, currentPage * drugsPerPage).map((drug, index) => (
                            <>
                                <tr>
                                    <td><img className='pill-image' src={drug.image} alt="pill" /></td>
                                    <td>{drug.name}</td>
                                    <td>{drug.ingredient}</td>
                                    <td>{drug.company}</td>
                                    <td>{drug.form}</td>
                                    <td>{drug.type}</td>
                                    <td className='accordion-cell'>
                                        <img src={dropdown17} alt="열기" />
                                    </td>
                                </tr>
                                {/* 아코디언 내용 행 */}
                                <tr className="accordion-content no-hover">
                                    <td colSpan="7">
                                        <div className="drug-details">
                                            <h4>제품 기본정보</h4>
                                            <div className="drug-item">
                                                <div className="drug-left">
                                                    <div className="drug-info">
                                                        <p><strong>제품명</strong>{drug.name}</p>
                                                        <p><strong>성분/함량</strong>{drug.ingredient}</p>
                                                        <p><strong>품목일련번호</strong>{drug.ingredient}</p>
                                                        <p><strong>전문/일반</strong>{drug.type}</p>
                                                        <p><strong>제조/수입사</strong>{drug.company}</p>
                                                        <p><strong>제형</strong>{drug.ingredient}</p>
                                                        <p><strong>의약품 모양</strong>{drug.ingredient}</p>
                                                    </div>
                                                    <div className="drug-info">
                                                        <p><strong>제품영문명</strong>{drug.ingredient}</p>
                                                        <p><strong>색깔</strong>{drug.ingredient}</p>
                                                        <p><strong>품목허가일자</strong>{drug.ingredient}</p>
                                                        <p><strong>성상</strong>{drug.ingredient}</p>
                                                        <p><strong>분류번호</strong>{drug.ingredient}</p>
                                                        <p><strong>분류명</strong>{drug.ingredient}</p>
                                                        <p><strong>효능/효과</strong>{drug.ingredient}</p>
                                                    </div>
                                                </div>
                                                <div className="drug-right">
                                                    <img className='pill-detail-image' src={drug.image} alt="pill"  />
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
                                                                <td>7{drug.length}</td>
                                                                <td>7{drug.width}</td>
                                                                <td>7{drug.thickness}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
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