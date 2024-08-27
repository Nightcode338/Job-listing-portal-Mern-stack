import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const sidebar = ({handleChange, handleClick}) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold'>Filters</h3>

        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} handleClick={handleClick} />
        <JobPostingData handleChange={handleChange}/>
        <WorkExperience handleChange={handleChange}/>
        <EmploymentType handleChange={handleChange}/>
      
    </div>
  )
}

export default sidebar
