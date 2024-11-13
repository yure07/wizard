import { InputMask } from 'primereact/inputmask';  
import { useState, useEffect } from 'react';
import { RxCaretDown } from "react-icons/rx"; 
import type { DataFormProps } from '../../App';

interface Step2Props {
  onChangeDataStep2: (startedBusiness: string, plan: string, legalName: string, zipCode: string,  dateBusiness?: string) => void;
  setDisableBtn: React.Dispatch<React.SetStateAction<boolean>>
  dataForm: DataFormProps
}

interface DataStep2Props{
  startedBusiness: string
  plan: string
  dateBusiness: string
  legalName: string
  zipCode: string
}

const plans:string[] = [
  'Acquire contracts',
  'Buy out one or more shareholders',
  'Hire employees',
  'Open new location',
  'Payment of Business Taxes',
  'Payment to workers for services',
  'Purchase another business',
  'Purchase equipment',
  'Purchase goods or services',
  'Purchase inventory',
  'Purchase of property or real estate',
  'Purchase supplies and materials',
  'Refinance existing debt',
  'Remodel business',
  'Spend on marketing',
  'Other'
]

export const Step2 = ({ onChangeDataStep2, setDisableBtn, dataForm }: Step2Props) => {
  const [dataStep2, setDataSetp2] = useState<DataStep2Props>({
    startedBusiness: 'Yes',
    plan: '',
    dateBusiness: '',
    legalName: '',
    zipCode: ''
  })
  const [showSelect, setShowSelect] = useState<boolean>(false)

  useEffect(() => {
    if(dataStep2.plan === '' || dataStep2.legalName === '' || dataStep2.zipCode === ''){
      setDisableBtn(true)
    } else {
      setDisableBtn(false)
    }
  }, [dataStep2 ,setDisableBtn])

  const shouldShowFirstSection = 
    dataStep2.plan === '' || 
    (dataStep2.startedBusiness === 'No'  && dataStep2.plan === '') ||
    (dataStep2.startedBusiness === 'No' && (dataStep2.dateBusiness === '' || dataStep2.dateBusiness.includes('_')))
  
  return(
    <div>
      {shouldShowFirstSection && (
        <>
          <article className="flex flex-col w-full px-8">
            <span className="w-full uppercase text-[#474744] font-semibold text-lg ">Business Details</span>
            <h1 className="text-xl font-semibold">Have you started your business yet?</h1>
            <span className="text-[#474744] mt-2">Help us determine the right finance option that matches your expectations.</span>
          </article>
          <div className="flex flex-col mt-6 items-center gap-5 md:flex-row md:px-8">
            <button 
              type="button" 
              className={`w-[90%] h-12 rounded-md border hover:border-[#2a7f91] hover:bg-[#f0fafa] md:w-full lg:w-[41%] ${dataStep2.startedBusiness === 'Yes' && 'bg-[#f0fafa] border-[#2a7f91]'}`}
              onClick={() => {
                onChangeDataStep2('Yes', dataStep2.plan, dataStep2.legalName, dataStep2.zipCode)
                setDataSetp2((prev) => ({ ...prev, startedBusiness: 'Yes' }))
              }}
            >
              Yes
            </button>
            <button 
              type="button" 
              className={`w-[90%] h-12 rounded-md border hover:border-[#2a7f91] hover:bg-[#f0fafa] md:w-full lg:w-[42%] ${dataStep2.startedBusiness === 'No' && 'bg-[#f0fafa] border-[#2a7f91]'}`}
              onClick={() => {
                onChangeDataStep2('No', dataStep2.plan, dataStep2.legalName, dataStep2.zipCode)
                setDataSetp2((prev) => ({ ...prev, startedBusiness: 'No' }))
              }}
            >
              No
            </button>
          </div>
          <section className="flex flex-col px-5 mt-6 md:px-8">
            {dataStep2.startedBusiness === 'No' && (
              <>
                <label htmlFor="date" className="font-semibold">When did your business start?</label>
                <InputMask 
                  name='date'
                  mask="99/9999" 
                  placeholder="MM/YYYY" 
                  className='border h-12 mt-1 rounded-md px-4 placeholder:font-semibold lg:w-[85%]'
                  onChange={(e) => {
                    setDataSetp2((prev) => ({ ...prev, dateBusiness: String(e.target.value) }))
                    onChangeDataStep2(dataStep2.startedBusiness, dataStep2.plan, dataStep2.legalName, dataStep2.zipCode, dataStep2.dateBusiness)
                  }} 
                />
              </>
            )}
            <label htmlFor="use" className="font-semibold mt-6">How do you plan to use the loan proceeds?</label>
            <div className="flex flex-row w-full border rounded-md h-12 mt-1 items-center pl-2 lg:w-[85%]">
              <span className='text-[#474744] font-semibold'>{dataStep2.plan === '' ? dataForm.plan : dataStep2.plan}</span>
              <RxCaretDown size={25} className={`ml-auto mr-2 ${dataStep2.plan !== '' && 'mt-0'}`} onClick={() => setShowSelect(!showSelect)}/>
              {showSelect && (
                <ul className='absolute p-2 w-[89%] mt-52 -ml-2 rounded-b-md overflow-auto h-40 bg-white shadow-md text-[#474744] font-semibold space-y-3 lg:w-[43%]'>
                  {plans.map((plan: string) => (
                    <li key={plan}>
                      <button type='button' onClick={() => {
                        onChangeDataStep2(dataStep2.startedBusiness, plan, dataStep2.legalName, dataStep2.zipCode, dataStep2.dateBusiness)
                        setDataSetp2({...dataStep2, plan})
                        setShowSelect(false)
                      }}
                      >
                        {plan}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      )}

      {!shouldShowFirstSection && (
        <>
          <article className="flex flex-col w-full px-8">
            <span className="w-full uppercase text-[#474744] font-semibold text-lg ">Business Details</span>
            <h1 className="text-xl font-semibold">What is the legal name of your business?</h1>
            <span className="text-[#474744] mt-2">Help us determine the right finance option that matches your expectations.</span>
          </article>
          <section className="flex flex-col px-5 mt-6 md:px-8">
            <label htmlFor="name" className="font-semibold">Legal name of your business</label>
            <input 
              type="text" 
              name='name'
              placeholder='Delta Ltd' 
              className='border h-12 mt-1 rounded-md px-4 placeholder:font-semibold lg:w-[87%]' 
              onChange={(e) => {
                onChangeDataStep2(dataStep2.startedBusiness, dataStep2.plan, e.target.value, dataStep2.zipCode, dataStep2.dateBusiness)
                setDataSetp2((prev) => ({ ...prev, legalName: e.target.value }))
              }}
            />
            <label htmlFor="code" className='mt-6 font-semibold'>Business Zip Code</label>
            <input 
              type="text" 
              name='code'
              placeholder='36104' 
              className='border h-12 mt-1 rounded-md px-4 placeholder:font-semibold lg:w-[87%]' 
              onChange={(e) => {
                onChangeDataStep2(dataStep2.startedBusiness, dataStep2.plan, dataStep2.legalName, e.target.value, dataStep2.dateBusiness)
                setDataSetp2((prev) => ({ ...prev, zipCode: e.target.value }))
              }}
            />
          </section>
        </>
      )}
      
    </div>
  )
}