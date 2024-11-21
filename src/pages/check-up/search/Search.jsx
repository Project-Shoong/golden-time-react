import { useRef } from 'react';
import SelectItemBox from './SelectItemBox';
import CheckInputBox from './CheckItemBox';
import axios from 'axios';

const Search = () => {
    const searchTerms = useRef({ sido:"", sigungu:"", day:"평일", time:"09:00", specialty:"가정의학과", center:"", regular:[], cancer:[]});

    const childRef = useRef([]);

    const reset = () => {
        childRef.current.forEach((child)=>{
            child.reset();
        })
    }
    async function search() {
        try{
            const response = await axios.get(`http://openapi1.nhis.or.kr/openapi/service/rest/HmcSearchService/getHmcList?ServiceKey=${process.env.REACT_APP_DATA_API_KEY}&numOfRows=`);
            console.log(JSON.stringify(response.data));
        }
        catch(error) {

        }
    }

    return (
        <div className="search">
            <div className="container">
                <h2>검진기관 검색</h2>
                <div className="top-box">
                    <SelectItemBox id="region" searchTerms={searchTerms} ref={(child) => childRef.current[0] = child} inputBox={{type:"button", value:"지역을 선택해 주세요.", readOnly:true, image:"arrow_below14_g.png"}} />
                    <SelectItemBox id="time" searchTerms={searchTerms} ref={(child) => childRef.current[1] = child} inputBox={{type:"button", placeholder:"방문 예정 시간을 선택해 주세요.", readOnly:true, image:'time15_g.png'}} />
                    <SelectItemBox id="specialty" searchTerms={searchTerms} ref={(child) => childRef.current[2] = child} inputBox={{type:"button", placeholder:"운영 진료과목을 선택해주세요.", readOnly:true, image:'arrow_below14_g.png'}} />
                    <SelectItemBox id="center" searchTerms={searchTerms} ref={(child) => childRef.current[3] = child} inputBox={{type:"text", placeholder:"검진기관명을 검색해 주세요.", readOnly:false, image:'search16.png'}} />
                </div>
                <div className="bottom-box">
                    <div>
                        <span className="b17mc">검진 유형</span>
                        <span className="r14g">(선택)</span>
                    </div>
                    <CheckInputBox id="regular" searchTerms={searchTerms} ref={(child) => childRef.current[4] = child}/>
                    <CheckInputBox id="cancer" searchTerms={searchTerms} ref={(child) => childRef.current[5] = child}/>
                </div>
                <div className="btn-box">
                    <button className="r17w" onClick={reset}>초기화</button>
                    <button className="r17w" onClick={search}>검  색</button>
                </div>
            </div>
        </div>
    )
}
export default Search;