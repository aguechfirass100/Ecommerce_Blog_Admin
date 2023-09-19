import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
// import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
// import { userData } from "../../dummyData";
// import { useEffect, useMemo, useState } from "react";
// import { userRequest } from "../../requestMethods";

export default function Home() {


  return (
    <div className="home">
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}