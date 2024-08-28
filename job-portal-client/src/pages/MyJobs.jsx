import React, { useEffect, useState } from 'react'

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/myJobs/jvjknkkjibjkhjh@mail.com`).then(res => res.json()).then(data => {
            setJobs(data)
        })
    }, [])

    const handleSearch = () => {
        const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        setJobs(filter);
        setIsLoading(false)
    }

    console.log(searchText)
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div>
        <h1 className='text-center p-4'>ALL My Jobs</h1>
        <div className='p-2 text-center mb-2'>
            <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text" name="search" id="search" className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
            <button className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>search</button>
        </div>

      </div>
      {/* table */}
      <section className='py-1 bg-blue/50 '>
      <div className='w-full xl:'>

      </div>

      </section>
    </div>
  )
}

export default MyJobs
