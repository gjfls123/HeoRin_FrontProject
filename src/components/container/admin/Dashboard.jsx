import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ productArray }) => {
    
  // console.log(productArray);
  const color = ['#FF0000','#FFA500','#FFFF00','#008000','#0000FF','#4B0082']
  const labels = productArray.map(([name]) => name);
  const itemData = productArray.map(([name, count]) => count)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '상품 판매량',
        data: itemData,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,       // 범례(legend) 표시 여부
        position: 'right',     // 범례 위치(top, bottom, left, right)
        labels: {
          color: 'black',     // 범례 글자 색
          font: {
            size: 10,        // 글자 크기
            weight: 'bold',  // 글자 두께
          },
        },
      },
    },
    responsive: true,  // 반응형 설정, true면 부모 컨테이너 크기에 맞게 자동 조절됨
    maintainAspectRatio: false,  // true면 원래 비율 유지, false면 크기 자유롭게 조절 가능
  
    animation: {
      animateRotate: false,   // 파이, 도넛 차트 회전 애니메이션 켜기/끄기
      duration: 500,        // 애니메이션 시간 (밀리초)
      easing: 'easeOutBounce' // 애니메이션 이징 효과 (easeInOut, linear 등 다양)
    },

  }
  return (
    
      <Pie data={chartData} options={options} />
    
  ) 
    
}
const PieChart2 = ({ userArray }) => {
    
  // console.log(productArray);
  const color = ['#FF0000','#FFA500','#FFFF00','#008000','#0000FF','#4B0082']
  const labels = userArray.map(([name]) => name);
  const userData = userArray.map(([name, count]) => count)
  const chartData2 = {
    labels: labels,
    datasets: [
      {
        label: '사용자 누적 판매량',
        data: userData,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,       // 범례(legend) 표시 여부
        position: 'right',     // 범례 위치(top, bottom, left, right)
        labels: {
          color: 'black',     // 범례 글자 색
          font: {
            size: 10,        // 글자 크기
            weight: 'bold',  // 글자 두께
          },
        },
      },
    },
    responsive: true,  // 반응형 설정, true면 부모 컨테이너 크기에 맞게 자동 조절됨
    maintainAspectRatio: false,  // true 면 원래 비율 유지, false면 크기 자유롭게 조절 가능
  
    animation: {
      animateRotate: false,   // 파이, 도넛 차트 회전 애니메이션 켜기/끄기
      duration: 500,        // 애니메이션 시간 (밀리초)
      easing: 'easeOutBounce' // 애니메이션 이징 효과 (easeInOut, linear 등 다양)
    },

  }
  return (
    
      <Pie data={chartData2} options={options} />
    
  )
}


const Dashboard = ({ data }) => {
  // 날짜별 매출
  const dailyStats = useMemo(() => {
    const stats = {};
    data.forEach(order => {
      const date = order.paymentDate.split(' ')[0];
      if (!stats[date]) stats[date] = { count: 0, totalAmount: 0 };
      stats[date].count += 1;
      stats[date].totalAmount += order.totalAmount;
    });
    return stats;
  }, [data]);

  // 상품별 판매량
  const productStats = useMemo(() => {
    const stats = {};
    data.forEach(order => {
      order.items.forEach(item => {
        if (!stats[item.name]) stats[item.name] = 0;
        stats[item.name] += item.count;
      });
    });
    return stats;
  }, [data]);
  // console.log(item);
  
  // 사용자별 주문 건수
  const userStats = useMemo(() => {
    const stats = {};
    data.forEach(order => {
      if (!stats[order.userEmail]) stats[order.userEmail] = 0;
      stats[order.userEmail] += 1;
    });
    return stats;
  }, [data]);



  const dailyArray = Object.entries(dailyStats);
  const userArray = Object.entries(userStats).sort((a, b) => b[1] - a[1]);
  const productArray = Object.entries(productStats).sort((a, b) => b[1] - a[1]);


  const totalData = productArray.reduce((sum, [, count]) => sum + count, 0);
  const angleArray = productArray.slice(0, 6).map(([idx, count]) => (count / totalData) * 360);
  const color = ['#FF0000','#FFA500','#FFFF00','#008000','#0000FF','#4B0082']
  
  console.log(angleArray); // angle 값들만 들어있는 배열
  // console.log(totalData);
  console.log(productArray);
  console.log(color);
  
  let current = 0;
  const gradientStops = angleArray.map((angle, idx) => {
    const start = current;
    const end = current + angle;
    current = end;
    return `${color[idx]} ${start}deg ${end}deg`;
  }).join(', ');
  
  
  
  
  return (
    <div className="dash">
      <div className="dash-con">
        <h2>매출 대시보드📊</h2>
        <div className="top">
          <DailySalesGraph data={dailyArray} />
        </div>
        <div className="bottoms">
          <div className="chart-bar">
          <ProductRankGraph data={productArray} />
          </div>
          <div className="chart-circle">
            <span x="10" y="25" fontSize="18">🥃 TOP 6 상품</span>
            <div className="chart-circle-con1">
          <PieChart productArray={productArray.slice(0, 6)} />
            </div>
          </div>
        </div>
        <div className="bottoms">
          <div className="chart-bar">
            <UserRankGraph data={userArray} />
          </div>
          <div className="chart-circle">
            <span x="10" y="25" fontSize="18">👥 TOP 6 사용자</span>
            <div className="chart-circle-con">
            <PieChart2 userArray={userArray.slice(0, 6)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DailySalesGraph = ({ data }) => {
  const width = 1600;
  const height = 400;
  const maxAmount = Math.max(...data.map(([_, d]) => d.totalAmount));

  return (
    <svg className="graph-svg"
     viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet">
      <text x="10" y="25" fontSize="18">📅 날짜별 매출</text>
      <line x1="60" y1={height - 50} x2={width - 20} y2={height - 50} stroke="#333" />
      <line x1="60" y1="50" x2="60" y2={height - 50} stroke="#333" />

      {data.map(([date, d], i) => {
        const x = 60 + i * ((width - 100) / data.length);
        const y = height - 50 - (d.totalAmount / maxAmount) * (height - 120);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#007bff" />
            <text x={x} y={y - 10} fontSize="12" textAnchor="middle">{d.totalAmount.toLocaleString()} 원</text>
            <text x={x} y={height - 20} fontSize="12" textAnchor="middle">{date}</text>
            {i > 0 && (
              <line
                x1={60 + (i - 1) * ((width - 100) / data.length)}
                y1={height - 50 - (data[i - 1][1].totalAmount / maxAmount) * (height - 120)}
                x2={x}
                y2={y}
                stroke="#007bff"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const ProductRankGraph = ({ data }) => {
  const width = 800;
  const height = 400;
  const barWidth = 80;
  const gap = 40;
  const maxCount = Math.max(...data.map(([_, count]) => count));
  return (
    <svg className="graph-svg"
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet">
      <text x="10" y="25" fontSize="18">🥃 TOP 6 상품</text>
      {data.slice(0, 6).map(([name, count], i) => {
        const barHeight = (count / maxCount) * (height - 100);
        const x = 80 + i * (barWidth + gap);
        const y = height - 50 - barHeight;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="tomato" />
            <text x={x + barWidth / 2} y={y - 10} fontSize="12" textAnchor="middle">{count} 개</text>
            <text x={x + barWidth / 2} y={height - 20} fontSize="12" textAnchor="middle">{name}</text>
          </g>
        );
      })}
    </svg>
  );
};

const UserRankGraph = ({ data }) => {
  const width = 800;
  const height = 400;
  const barWidth = 80;
  const gap = 40;
  const maxCount = Math.max(...data.map(([_, count]) => count));

  return (
    <svg className="graph-svg" 
    viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet">
      <text x="10" y="25" fontSize="18">👥 TOP 6 사용자</text>
      {data.slice(0, 6).map(([email, count], i) => {
        const barHeight = (count / maxCount) * (height - 100);
        const x = 80 + i * (barWidth + gap);
        const y = height - 50 - barHeight;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="skyblue" />
            <text x={x + barWidth / 2} y={y - 10} fontSize="12" textAnchor="middle">{count} 개</text>
            <text x={x + barWidth / 2} y={height - 20} fontSize="12" textAnchor="middle">{email}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default Dashboard;
