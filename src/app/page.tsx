'use client'

import Image from 'next/image';
import lixeira from '../imgs/lixeira.png';
import { useState } from 'react';
import { TodoItens } from '@/types/TodoItens';
import { link } from 'fs';

const Page = () => {
  const [list, setList] = useState<TodoItens[]>([
    {label: 'Criar planilhas hoje', checked: false},
    {label: 'Preciso enviar emails para os clientes', checked: true}
  ]);
  
  const [intemInput, setItemInput] = useState('');  //intemInput armazenará o campo digitado no input text

  const handleButton = ()=> { //Botão para adicionar uma nova lista
    if(intemInput.trim() === '') return; //Verifica se o campo está vazio, se estiver ele para a execução

    setList([   //Função para criar uma nova lista com o clone já pronto do list da linha 9
      ...list,  //Clone da lista com duas lista de exemplos
      {label: intemInput, checked: false} //Nova lista criada com o dado armazenado no intemInput
    ]);
    setItemInput(''); //Assim que clicar no ADD o campo se resetará automaticamente
  };


  //Botão para deletar um item na lista:
  const deleteItem = (index: number) => {
    // Ao clicar, se o key for diferente de index, ele retornará TRUE para todos que são IGUAIS
    // e retornará FALSE para quando for diferente que no caso é a verificação abaixo e vai deletar a lista.
    setList(list.filter( (event, key) => key !== index ));
  };

  const toggleItem = (index: number)=> {
    
    const newList = [...list]; //Variável para armazenar o clone da list

    //Loop para indentificar cada index no item
    for(let i in newList) {
      if(index === parseInt(i)) {  //Se o index do item for igual ao (i) ele trocará a checkbox
        newList[i].checked = !newList[i].checked;
      };
    };

    setList(newList);
  };

  return (
    <div className="w-screen h-screen bg-purple-700 flex items-center justify-center overflow-x-hidden">
      <div className="w-96 md:w-[28.5rem] lg:w-[51rem] flex flex-col px-10">
        <div className="flex border-4 md:border-8 border-purple-500 rounded-md lg:rounded-lg">
          {/* Suporta -- caracteres */}
          <input type="text" className="w-full py-2 px-3 lg:p-3 text-black outline-none"
            placeholder="O que fará hoje?" onChange={e => setItemInput(e.target.value)} value={intemInput} maxLength={42}
          />
          <button onClick={handleButton} className="bg-blue-400 px-4">ADD</button>
        </div>
        
        <div className="rounded bg-purple-500 w-20 h-[1px] my-8 lg:my-12 mx-auto"></div>
        
        {/* Quantidade de itens na lista */}
        <p className='text-purple-600 bg-gray-200 text-base lg:text-lg font-semibold px-3 p-1.5 mb-3.5 rounded mx-auto'>ITENS NA LISTA: {list.length}</p>
        
        {/* Listas afazeres */}
        <div className="w-full h-[29rem] snap-y">
          <ul className="bg-white text-gray-600 text-sm lg:text-base font-medium px-1 lg:px-4 border-4 md:border-8 border-purple-500 rounded-md lg:rounded-lg">
            {list.map((item, index) => (
              <li key={index} className="flex pt-2.5 lg:pt-4 pb-2 lg:pb-3 mx-2 border-b-2 border-gray-200">
                <input type="checkbox" className="mr-3" checked={item.checked} onClick={()=> toggleItem(index)} />
                <span className="w-96 lg:w-full flex justify-between">
                  <div className='break-all lg:break-normal py-1 w-60 md:w-72 lg:w-full'>
                    {item.label}
                  </div>
                  <button className='pl-2 flex justify-end items-center' onClick={() => deleteItem(index)}>
                    <Image src={lixeira} alt="Deletar" className='w-6'/>
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded bg-purple-500 w-20 h-[1px] my-8 lg:my-12 mx-auto"></div>
          
          {/* Tecnologias usada no projeto */}
          <div>
            <div className='w-48 pl-1 mx-auto flex justify-around items-center'>
  
              {/* ReactJs */}
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 3618.6 3618.6" id="react"><path fill="#222" d="M0 0h3618.6v3618.6H0z"></path><circle cx="1806.5" cy="1807.1" r="302.6" fill="#00d8ff"></circle><path fill="none" stroke="#00d8ff" stroke-miterlimit="10" stroke-width="144.746" d="M1806.5 1191.9c406.2 0 783.6 58.3 1068.1 156.2 342.8 118 553.6 296.9 553.6 458.9 0 168.8-223.4 358.9-591.5 480.8-278.3 92.2-644.6 140.4-1030.2 140.4-395.4 0-769.7-45.2-1051.2-141.4-356.1-121.7-570.6-314.2-570.6-479.8 0-160.7 201.3-338.2 539.3-456 285.6-99.5 672.3-159.1 1082.5-159.1z"></path><path fill="none" stroke="#00d8ff" stroke-miterlimit="10" stroke-width="144.746" d="M1271 1501.3c202.9-351.9 442-649.7 669-847.2 273.5-238 533.8-331.2 674.1-250.3 146.2 84.3 199.3 372.8 121 752.7-59.2 287.2-200.4 628.5-393.1 962.6-197.5 342.5-423.7 644.2-647.6 840-283.3 247.7-557.3 337.3-700.7 254.6-139.2-80.3-192.4-343.3-125.7-695 56.4-297.4 198-662.1 403-1017.4z"></path><path fill="none" stroke="#00d8ff" stroke-miterlimit="10" stroke-width="144.746" d="M1271.5 2119.8c-203.5-351.6-342.1-707.4-399.9-1002.7-69.6-355.8-20.4-627.9 119.8-709 146.1-84.6 422.5 13.5 712.5 271 219.3 194.7 444.4 487.5 637.6 821.3 198.1 342.2 346.6 688.8 404.3 980.5 73.1 369.2 13.9 651.3-129.4 734.2-139.1 80.5-393.5-4.7-664.9-238.2-229.2-197.3-474.5-502.1-680-857.1z"></path></svg>
              </div>
              
              {/* NextJs */}
              <div className='bg-white h-10 w-10 rounded-full'>
                <svg width="40px" height="40px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                    <g>
                        <path d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z" fill="#000000"></path>
                    </g>
                </svg>
              </div>

              {/* Typescript */}
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 128 128" id="typescript"><path fill="#007acc" d="M2,63.91v62.5H127V1.41H2Zm100.73-5a15.56,15.56,0,0,1,7.82,4.5,20.58,20.58,0,0,1,3,4c0,.16-5.4,3.81-8.69,5.85-.12.08-.6-.44-1.13-1.23a7.09,7.09,0,0,0-5.87-3.53c-3.79-.26-6.23,1.73-6.21,5a4.58,4.58,0,0,0,.54,2.34c.83,1.73,2.38,2.76,7.24,4.86,8.95,3.85,12.78,6.39,15.16,10,2.66,4,3.25,10.46,1.45,15.24-2,5.2-6.9,8.73-13.83,9.9a38.32,38.32,0,0,1-9.52-.1A23,23,0,0,1,80,109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34,9.34,0,0,1,1.15-.73L82.5,101l3.59-2.08.75,1.11a16.78,16.78,0,0,0,4.74,4.54c4,2.1,9.46,1.81,12.16-.62a5.43,5.43,0,0,0,.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48,16.48,0,0,1-3.43-6.25,25,25,0,0,1-.22-8c1.33-6.23,6-10.58,12.82-11.87A31.66,31.66,0,0,1,102.73,58.93ZM73.39,64.15l0,5.12H57.16V115.5H45.65V69.26H29.38v-5a49.19,49.19,0,0,1,.14-5.16c.06-.08,10-.12,22-.1L73.33,59Z"></path></svg>
              </div>

              {/* TailwindCss */}
              <div>
                <svg viewBox="0 0 52 31" className="text-slate-900 dark:text-white w-auto h-6"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#38bdf8"></path></svg>
              </div>
            </div>
          </div>
          <p className='text-center text-gray-200 text-sm py-4'>Criado por Gabriel Jaune</p>
        </div>
      </div>

    </div>
  );
};

export default Page;