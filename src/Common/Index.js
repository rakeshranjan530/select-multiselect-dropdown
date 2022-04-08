import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropDown = ({ data }) => {
    //data = ['a','b']
    //data = [{id:"a",title:"a"}]
    const ref = useRef(null);
    const [isShow, setShow] = useState(false);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false)
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref])
    let tempdata = data?.map(d => {
        if (typeof d === 'string' || typeof d === 'number') {
            return (
                {
                    title: d,
                    id: d,
                    isChecked: false,
                }
            )
        }
        if (typeof d === 'object') {
            d['isChecked'] = false;
            return { ...d }
        }
        return { ...d }
    }) || []
    const [arrayData, setArrayData] = useState(tempdata)
    const [searchData,setSearchData] = useState(tempdata);
    const handleDropDown = () => setShow(true);
    const handleCheck = (i) => {
        let tempD = [...arrayData];
        tempD.map((td, j) => {
            if (i === j) {
                let isChecked = false;
                if (td['isChecked'] === false) isChecked = true;
                td['isChecked'] = isChecked;
                return { ...td }
            }
            return { ...td }
        })
        setArrayData(tempD)
    }
    const handleClear = () => {
        let tempD = [...arrayData];
        tempD.map(td => {
            td.isChecked = false;
            return { ...td }
        })
        setArrayData(tempD)
        setShow(true)
    }
    const handleAllSelect = () => {
        let tempD = [...arrayData];
        let isChecked = true;
        if (arrayData?.every(ar => ar.isChecked)) {
            isChecked = false;
        }
        tempD.map(td => {
            td.isChecked = isChecked;
            return { ...td }
        })
        setArrayData(tempD)
    }
    const handleSearch = (e) => {
        const {value} = e.target;
        const serchArr = searchData.filter(b => b?.title.toLowerCase().includes(value.toLowerCase()));
        setArrayData([...serchArr]);
    }
    return (
        <div className="vh-100 pt-5" name="asdasdsadasdsa">
            <div className="container h-custom">
                <div className="row">
                    <div className="col-4">
                        {
                            arrayData.filter(ar => ar.isChecked && ar).map((va,i) => {
                                return (
                                    <div key={i} className="fw-bold d-flex justify-content-center" style={{boxShadow:'1px 1px whitesmoke', padding:"5px",marginBottom:"5px"}}>{va.title}</div>
                                )
                            })
                        }
                    </div>
                    <div className="col-4" ref={ref}>
                        <input className="form-control form-control-lg" placeholder="select" onClick={handleDropDown} onChange={handleSearch} />
                        {

                            isShow && arrayData.length > 0 && (
                                <div>
                                    <div className="multi-dropdown">
                                        {/* all clear */}
                                        <input className="me-2" type="checkbox" checked={arrayData?.every(ar => ar.isChecked)} onChange={() => handleAllSelect()} /> All Select
                                    </div>
                                    {arrayData?.map((e, i) => {
                                        return (
                                            <div className="multi-dropdown" key={i}>
                                                <input className="me-2" type="checkbox" onChange={() => handleCheck(i)} checked={e?.isChecked} />
                                                {e?.title}</div>
                                        )
                                    })}
                                    {
                                        arrayData.filter(a => a.isChecked === true).length > 0 && (
                                            <div className="mt-3">
                                                <button className="btn btn-success me-4">Submit</button>
                                                <button className="btn btn-danger" onClick={handleClear}>Clear</button>
                                            </div>
                                        )
                                    }
                                </div>
                            )

                        }
                    </div>
                    <div className="col-4" />
                </div>
            </div>
        </div>
    )
}
export default MultiSelectDropDown;