import React, { useState } from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import AnalyticsButton from "../../Assets/components/Analytics/AnalyticsButton";
import "./Analytics.css";
import AverageDateRange from "../../Assets/components/Analytics/AverageDateRange";
import TimeInterval from "../../Assets/components/Analytics/TimeInterval";
import RangeDate from "../../Assets/components/Analytics/RangeDate";
import CountData from "../../Assets/components/Analytics/CountData";

const Analytics = () => {
  const [selectedButton, setSelectedButton] = useState("Average");

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="bg-[rgba(16,16,16,0.5)] md:h-[87%] m-8 rounded-lg border border-white">
        <div className="md:h-[35%] md:flex m-4 gap-3">
          <AnalyticsButton
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <div className="md:w-[35%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border flex flex-col border-white text-white backdrop-blur justify-center items-center py-4">
            {selectedButton === "Average" && <AverageDateRange />}
            {selectedButton === "Time" && <TimeInterval />}
            {selectedButton === "Range" && <RangeDate />}
            {selectedButton === "Count" && <CountData />}
          </div>

          <div className="md:w-[40%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border border-white overflow-x-auto">
            <table className="text-lg font-normal text-white font-poppins">
              <thead className="sticky top-0">
                <tr className="flex gap-7 py-4  justify-evenly bg-[rgb(16,16,16)] rounded-tr-xl rounded-tl-xl px-3">
                  <th className="">S.No</th>
                  <th className="whitespace-nowrap">Avg T1</th>
                  <th className="whitespace-nowrap">Avg T2</th>
                  <th className="whitespace-nowrap">Avg T3</th>
                  <th className="whitespace-nowrap">Avg T4</th>
                  <th className="whitespace-nowrap">Avg T5</th>
                  <th className="whitespace-nowrap">Avg T6</th>
                  <th className="whitespace-nowrap">Avg T7</th>
                  <th className="whitespace-nowrap">Avg T8</th>
                  <th className="whitespace-nowrap">Avg T9</th>
                  <th className="whitespace-nowrap">Avg T10</th>
                  <th className="whitespace-nowrap">Avg T11</th>
                  <th className="whitespace-nowrap">Avg T12</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">2</td>
                  <td className="whitespace-nowrap">18</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                  <td className="whitespace-nowrap">30</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
                <tr className="flex px-3 py-2 border-t border-white gap-7 justify-evenly">
                  <td className="">1</td>
                  <td className="whitespace-nowrap">20</td>
                  <td className="whitespace-nowrap">22</td>
                  <td className="whitespace-nowrap">21</td>
                  <td className="whitespace-nowrap">19</td>
                  <td className="whitespace-nowrap">25</td>
                  <td className="whitespace-nowrap">24</td>
                  <td className="whitespace-nowrap">23</td>
                  <td className="whitespace-nowrap">26</td>
                  <td className="whitespace-nowrap">30</td>
                  <td className="whitespace-nowrap">28</td>
                  <td className="whitespace-nowrap">27</td>
                  <td className="whitespace-nowrap">29</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:h-[58%] md:flex">
          <div className="md:w-full md:h-full m-4 bg-[rgba(16,16,16,0.6)] rounded-xl border border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
