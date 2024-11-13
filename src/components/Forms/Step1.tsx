import { useEffect } from "react";

interface Step1Props {
  onSelectRevenue: (revenue: string) => void;
  revenueSaved: string
  setDisableBtn: React.Dispatch<React.SetStateAction<boolean>>
}

const valuesRevenues:string[] = [
  'Pre-Revenue',
  'Less than $60,000',
  '$60,000 - $200,000',
  '$200,000 - $500,000',
  '$500,000 - $1,000,000',
  '$1,000,000 - $5,000,000',
  '$5,000,000+',
]

export const Step1 = ({ onSelectRevenue, revenueSaved, setDisableBtn }: Step1Props) => {

  useEffect(() => {
    if(revenueSaved !== '') {
      setDisableBtn(false)
    }
  }, [revenueSaved, setDisableBtn])
  
  return(
    <>
      <article className="flex flex-col w-full px-8">
        <span className="w-full uppercase text-[#474744] font-semibold text-lg ">Business Details</span>
        <h1 className="text-xl font-semibold ">What is your annual revenue?</h1>
        <span className="text-[#474744] mt-2">Help us determine the right finance option that matches your expectations.</span>
      </article>
      <div className="flex flex-col items-center mt-16 gap-3 text-[#474744] font-semibold md:grid md:grid-cols-2 md:px-8">
        {valuesRevenues.map((value) => (
          <button 
            type="button" 
            key={value}
            className={`w-[90%] h-12 rounded-md border hover:border-[#2a7f91] hover:bg-[#f0fafa] ${revenueSaved === value && 'bg-[#f0fafa] border-[#2a7f91]'} md:w-full lg:w-72`}
            onClick={() => {
              onSelectRevenue(value)
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  )
}