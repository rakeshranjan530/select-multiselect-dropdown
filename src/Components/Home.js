import React from "react";
import MultiSelectDropDown from "../Common/Index";
const infoArr = ["name","rakesh","apple","orange","banana","papaya","lemon"]

const Home = () => {
    return(
        <div>
            <MultiSelectDropDown data={infoArr}/>
        </div>
    )
}
export default Home;