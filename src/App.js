import React, { useEffect } from 'react';
import './App.css';
import 'fullpage.js/dist/fullpage.css';
import fullpage from 'fullpage.js';

const App = () => {
  useEffect(() => {
    new fullpage('#fullpage', {
      autoScrolling: true,
      scrollHorizontally: true,
      dragAndMove: true,
    });
  }, []);

  return (
    <div id="fullpage">
      <div className="section active" style={{ backgroundImage: 'url(/image/1.jpg)' }}>
        <div className="section-content">
          <h1>年度报告 - 第一屏</h1>
          <p>这里是第一屏的内容。</p>
        </div>
      </div>
      <div className="section" style={{ backgroundImage: 'url(/image/2.jpg)' }}>
        <div className="section-content">
          <h1>年度报告 - 第二屏</h1>
          <p>这里是第二屏的内容。</p>
        </div>
      </div>
      <div className="section" style={{ backgroundImage: 'url(/image/3.jpg)' }}>
        <div className="section-content">
          <h1>年度报告 - 第三屏</h1>
          <p>这里是第三屏的内容。</p>
        </div>
      </div>
    </div>
  );
};

export default App;