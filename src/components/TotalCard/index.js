import React from 'react'


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function TotalCard({ title, number, icon }) {
  const Icon = icon
  return (
    <div className='card'>
       <div className='card-left'>
          <i style={{fontSize:15}}>{title}</i>
          <p style={{color:'#F76D28'}}>{numberWithCommas(number)}</p>
       </div>
       <div className='card-right'>
         <span><Icon style={{color:'#fff'}}/></span>
       </div>
    </div>
  )
}

export default TotalCard