
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { searchCompanies } from '../../Api';
import { CompanySearch } from '../../company';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import Search from '../../Components/Search/Search';

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [PortfolioValues,setPortfolioValues]=useState<string[]>([]);
    const [searchResult,setSearchResult]=useState<CompanySearch[]>([]);
    const [serverError,setServerError]=useState<string | null>(null);
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      console.log(e);
    };
   
    const onPortfolioCreate=(e:any)=>{
      e.preventDefault();
      const exists=PortfolioValues.find((value)=>value ===e.target[0].value)
      if(exists) return;
      const updatedPortfolio=[...PortfolioValues,e.target[0].value]
      setPortfolioValues(updatedPortfolio);
    }
    const onPortfolioDelete=(e:any)=>{
       e.preventDefault();
       const removed=PortfolioValues.filter((value)=>{
        return value !==e.target[0].value;
       });
       setPortfolioValues(removed);
    }
  
    const onSearchSubmit = async(e: SyntheticEvent) => {
      e.preventDefault();
      const result= await searchCompanies(search);
      if(typeof result==="string")
        {
          setServerError(result);
        }else if(Array.isArray(result.data)){
          setSearchResult(result.data);
        }
        console.log(searchResult);
    };
  return (
    <div>
    <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
    <ListPortfolio portfolioValues={PortfolioValues} onPortfolioDelete={onPortfolioDelete}
    />
    <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>

    {serverError && <div>Unable to connect to API</div>}

  </div>
  )
}

export default SearchPage