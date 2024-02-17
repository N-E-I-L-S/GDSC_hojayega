import React from "react"
import BarChart from "../components/BarChart"

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>DashBoard</h3>
          </div>
          
          <BarChart/>
          {/* <Cards />
          <Charts />
          <User />
          <TableData /> */}
        </div>
      </section>
    </>
  )
}

export default Home
