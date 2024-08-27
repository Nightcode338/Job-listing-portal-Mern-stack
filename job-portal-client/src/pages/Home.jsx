import Banner from "../components/Banner"
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    useEffect(() =>{
        setIsLoading(true);
        fetch("jobs.json").then(res => res.json()).then(data =>{
            setJobs(data);
            setIsLoading(false);
        })
    }, [])

    // console.log(jobs)

    const [query, setQuery] = useState("");
    const handleInputChange = (event) =>{
        setQuery(event.target.value)
        setCurrentPage(1);
    }

    // filter jobs by title
    const filteredItems = jobs.filter((jobs) => jobs.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    //Radio filtering
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
        setCurrentPage(1);
    }

    //Button filtering
    const handleClick = (event) =>{
        setSelectedCategory(event.target.value)
        setCurrentPage(1);
    }

    //calculate the index range
    const calculatePageRange = () =>{
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex, endIndex};
    }

    // function for the next page
    const nextPage = () =>{
        if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
            setCurrentPage(currentPage + 1);
        }
    }

    //funtion for the previous page
    const prevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    //Main fuction
    const filteredData = (jobs, selected, query) =>{
        let filteredJobs = jobs;

        //filtering input items
        if (query) {
            filteredJobs = filteredJobs.filter(job => {
                return Object.values(job).some(value =>
                    value.toString().toLowerCase().includes(query.toLowerCase())
                );
            });
        }

        //category filtering
        if (selected) {
            // Check if the selected value should be used as a maxPrice filter
            const isPrice = !isNaN(selected); // Check if selected is a number
            
            // Apply filters conditionally
            filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, postingDate, salaryType, employmentType, experienceLevel }) => {
                const lowerSelected = selected.toLowerCase();
                const formattedPostingDate = new Date(postingDate);
                const formattedSelectedDate = new Date(selected);
    
                return (
                    (!isPrice || parseInt(maxPrice) <= parseInt(selected)) &&
                    (jobLocation.toLowerCase() === lowerSelected ||             
                    formattedPostingDate >= formattedSelectedDate ||            
                    salaryType.toLowerCase() === lowerSelected ||               
                    employmentType.toLowerCase() === lowerSelected ||
                    experienceLevel.toLowerCase() === selected.toLowerCase())             
                );
            });
    
            console.log(filteredJobs);
        }
    
            
        

        //slice the data based on current page
    const {startIndex, endIndex} = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex)

        return filteredJobs.map((data, i) => <Card key={i} data={data} />)
    }


    const result= filteredData(jobs, selectedCategory, query);

  return (
    <div> 
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main content */}
      <div className="bg-[#f3f1f1] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

        {/* left side */}
        <div className="bg-white p-4 rounded">
            <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>

        {/* job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
            {
                isLoading ? (<p className="font-medium">Loading....</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                <p>No jobs found</p>
                </>
            }

            {/* pigination here */}
            {
                result.length > 0 ?(
                    <div className="flex justify-center mt-4 space-x-8">
                        <button onClick={prevPage} disabled={currentPage ===1} className="hover:underline">Previous</button>
                        <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / 
                            itemsPerPage)} className="hover:underline">Next</button>

                    </div>
                ) : ""
            }


            </div>

        {/* right side */}
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>

    </div>
  )
}

export default Home