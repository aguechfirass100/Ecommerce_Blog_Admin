import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";
import { addToArchive, getArchive } from "../../redux/apiCalls"
import { useDispatch } from "react-redux"

export default function WidgetLg() {

  const [orders, setOrders] = useState([]);
  const [archive, setArchive] = useState([]);


  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const archiveData = await getArchive();
        setArchive(archiveData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArchive();
  }, []);

  console.log(archive)

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  
  const dispatch = useDispatch()
  
  // const handleArchive = async (e, orderData) => {
  //   e.preventDefault()
  //   console.log(orderData)

  //   try {
  //     console.log(orderData);
  //     await addToArchive(orderData, dispatch);
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === orderData._id ? { ...order, archived: true } : order
  //       )
  //     )
  //     //console.log("those are the orders",orders)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const handleArchive = async (e, orderData) => {
    e.preventDefault();
    try {
      const updatedOrder = { ...orderData, status: "archived" };
      await userRequest.put(`/orders/${orderData._id}`, updatedOrder);
      await addToArchive(orderData, dispatch);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderData._id ? { ...order, status: "archived" } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };


  const downloadReport = () => {
    const filename = "archive_report.txt";
    const data = JSON.stringify(archive, null, 2);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Payed Orders</h3>
      <div className="widgetLgList">
        {orders.map((order) => (
          <div
            className={`widgetLgItem ${order.status === "archived" ? "archived" : ""}`}
            key={order._id}
          >
            <div className="widgetLgUser">
              {/* <img className="widgetLgImg" src={order.userImg} alt="User" /> */}
              <span className="widgetLgName">{order.userId}</span>
            </div>
            <span className="widgetLgDate">{format(order.createdAt)}</span>
            <span className="widgetLgAmount">${order.amount}</span>
            {order.archived 
              ? (<div className="widgetLgStatus">
                    <Button type={"Order is Archived"} />
                  </div>) 
              :  (<>
                  <div className="widgetLgStatus">
                    <Button type={order.status} />
                  </div>
                  <button className="widgetLgArchiveButton" onClick={(e) => handleArchive(e, order)} >Archive</button>
                </>)}
           </div>
        ))}
      </div>
      <div className="widgetLgReportContainer">
        <button className="widgetLgReportButton" onClick={downloadReport} >Download Orders Archive</button>
      </div>
    </div>
  );
}
