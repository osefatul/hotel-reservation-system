import React from "react";
import "./hotelDetails.css";

import { productData } from "../../../../dummyData";
import { Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Charts from "../../../../components/adminComponents/components/charts/Charts";
import Sidebar from "../../../../components/adminComponents/components/sidebar/Sidebar";
import Navbar from "../../../../components/Navbar";



function HotelDetails() {
  return (

    <div>
      <div className = "bg-black sticky z-50 top-0 ">
        <Navbar  />
      </div>

      <div className="flex w-full">
          <div className="w-[15%]">
            <Sidebar />
          </div>



          <div className="w-[85%] product ">
            <div className="productTitleContainer px-5 mt-10">
              <h1 className="productTitle font-bold">Hotel</h1>
            
            </div>
            <div className="productTop">
              <div className="productTopLeft">
                <Charts data={productData} dataKey="Sales" title="Sales Performance" />
              </div>
              <div className="productTopRight">
                <div className="productInfoTop">
                  <img
                    src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="productInfoImg"
                  />
                  <span className="productName">Apple Airpods</span>
                </div>
                <div className="productInfoBottom">
                  <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">sales:</span>
                    <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">active:</span>
                    <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">in stock:</span>
                    <span className="productInfoValue">no</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="productBottom">
              <form className="productForm">
                <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="productFormRight">
                  <div className="productUpload">
                    <img
                      src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                      className="productUploadImg"
                    />
                    <label for="file">
                      <Publish />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="productButton">Update</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>

  );
}

export default HotelDetails;
