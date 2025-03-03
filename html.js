

export function html(){
   
    const fontSizes =["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "11" , "12" , "13"]
    const LetterSpacing = ["0" , "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "11" , "12"]
    return `
    <div
         class="squareCraft-p-4  squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
         <div class="squareCraft-flex squareCraft-poppins squareCraft-universal squareCraft-items-center squareCraft-justify-between">
            <img class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
           
         </div>
         <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
         </p>
         <div
            class="squareCraft-mt-6 squareCraft-poppins squareCraft-border-t squareCraft-border-dashed squareCraft-border-color-494949  squareCraft-w-full">
         </div>
         <div class="squareCraft-mt-6 squareCraft-poppins squareCraft-flex  squareCraft-items-center squareCraft-universal">
            <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader ">Design</p>
            <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Advanced</p>
            <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Presets</p>
         </div>
         <div
            class="squareCraft-border-t squareCraft-border-solid squareCraft-relative squareCraft-border-color-494949 squareCraft-w-full">
            <div
               class="squareCraft-absolute squareCraft-top-0 squareCraft-left-0 squareCraft-bg-colo-EF7C2F squareCraft-w-16 squareCraft-h-1px">
            </div>
         </div>
         <div
            class="squareCraft-rounded-6px  squareCraft-mt-6  squareCraft-border squareCraft-border-solid squareCraft-border-EF7C2F squareCraft-bg-color-3d3d3d">
            <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
               <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
                  <img loading="lazy"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.svg" alt="">
                  <p class="squareCraft-universal squareCraft-poppins">Typography</p>
               </div>
               <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
            </div>
            <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
            <div
               class="squareCraft-flex squareCraft-px-2   squareCraft-items-center squareCraft-justify-between">
               <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
                  <div class="toggle-container" id="toggleSwitch">
                     <div class="toggle-bullet"></div>
                  </div>
                  <p id="toggleText" class="squareCraft-text-sm squareCraft-poppins">Enable</p>
               </div>
            </div>
            <div class="squareCraft-h-1px  squareCraft-bg-3f3f3f"></div>
            <div class="squareCraft-mt-2">
               <div
                  class="squareCraft-flex squareCraft-poppins squareCraft-px-2  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
                  <div
                     class="squareCraft-cursor-pointer squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
                     Normal
                  </div>
                  <div
                     class="squareCraft-cursor-pointer squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
                     Hover
                  </div>
               </div>
               <div class="squareCraft-px-4">
                  <div class="squareCraft-h-1px  squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
               </div>
            </div>
            <div class=" squareCraft-mt-2 squareCraft-px-2 squareCraft-flex squareCraft-justify-between">
               <p class="squareCraft-text-sm squareCraft-universal squareCraft-poppins">Text</p>
               <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
            </div>
            <div class="squareCraft-mt-2  squareCraft-grid squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2 squareCraft-px-2">
               <div id="squareCraft-font-family" 
                  class="squareCraft-flex  squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-7 squareCraft-cursor-pointer squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div class=" squareCraft-w-full   squareCraft-px-2  ">
                     <p class="squareCraft-text-sm  squareCraft-poppins  squareCraft-font-light">Sf Pro sans</p>
                  </div>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                     <img class=" squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>
               <div class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                           squareCraft-rounded-6px 
                           ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" 
                              class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                                <div class="squareCraft-v-line"></div>
                           <div class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p class="squareCraft-flex squareCraft-font-light squareCraft-text-sm squareCraft-px-1_5 squareCraft-items-center squareCraft-justify-center squareCraft-items-center">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-2 squareCraft-ml-1" style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px" 
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm" 
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
            <div class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2 squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2 ">
               <div class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-6  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div class="  squareCraft-px-2 squareCraft-w-full  ">
                     <p class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">Regular</p>
                  </div>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                     <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>
               <div class="squareCraft-flex squareCraft-justify-between squareCraft-col-span-4  squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center">
                     <img class=" squareCraft-rounded-6px squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">
                  </div>
                    <div class="squareCraft-v-line"></div>
                  <div class="squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center squareCraft-border squareCraft-border-585858 squareCraft-w-13px squareCraft-border-solid squareCraft-h-13px">
                  </div>
                    <div class="squareCraft-v-line"></div>
                  <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-flex squareCraft-mx-auto squareCraft-items-center squareCraft-justify-center" width="12px"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/gap.svg" alt="">
               </div>
            </div>
            <div class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2 squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2 ">
               <div class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div
                     class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                     <img id="squareCraftTextAlignLeft" data-align="left"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                        class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto"  alt="">
                     <div class="squareCraft-v-line"></div>
                     <img id="squareCraftTextAlignRight" data-align="right"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                        class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto"  alt="">
                     <div class="squareCraft-v-line"></div>
                     <img id="squareCraftTextAlignCenter" data-align="center"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                        class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto"  alt="">
                     <div class="squareCraft-v-line"></div>
                     <img id="squareCraftTextAlignJustify" data-align="justify"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                        class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto "  alt="">
                  </div>
               </div>
               <div class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-3 
                  squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                  squareCraft-items-center squareCraft-w-full ">
                  <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                     squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                     ">
                     <input type="text" id="squareCraftLetterSpacingInput" value="15px" class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                        squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                     <div class="">
                        <img id="squareCraftLetterSpacingDropdown"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                           class=" squareCraft-px-1 squareCraft-ml-1 squareCraft-mx-auto squareCraft-cursor-pointer" >
                     </div>
                  </div>
                  <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                     squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                     squareCraft-mt-1">
                     ${LetterSpacing?.map(gap => `
                     <div class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                        data-value="${gap}">${gap}</div>
                     `).join('')}
                  </div>   
               </div>

            </div>
            <div class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2 squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2">
               <div class="squareCraft-flex squareCraft-col-span-6 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div
                     class="squareCraft-flex squareCraft-px-2 squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                    <p class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  ">B</p>
                     <div class="squareCraft-v-line"></div>
                    <p class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">I</p>
                     <div class="squareCraft-v-line"></div>
                   <p class="squareCraft-font-underline squareCraft-universal squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">U</p>
                     <div class="squareCraft-v-line"></div> 
                     <p class="squareCraft-font-underline squareCraft-universal squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">abc</p>
                     <div class="squareCraft-v-line"></div> 
                     <img id="squareCraftTextAlignJustify" data-align="justify"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.png"
                     class="squareCraft-cursor-pointer  "  alt="">
                    
                  </div>
               </div>
            </div>
            <div class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2 squareCraft-w-full squareCraft-grid-cols-12 squareCraft-gap-2">
               <div class="squareCraft-flex squareCraft-col-span-6 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div
                     class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                    <p class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">AG</p>
                     <div class="squareCraft-v-line"></div>
                    <p class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">ag</p>
                     <div class="squareCraft-v-line"></div>
                     <p class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">Ag</p>
                     <div class="squareCraft-v-line"></div> 
                     <p class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">AG</p>
                     <div class="squareCraft-v-line"></div> 
                     <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">
                    
                  </div>
               </div>

               <div class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                  <div
                     class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                    <p class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">RLT</p>
                     <div class="squareCraft-v-line"></div>
                    <p class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">LTR</p>
                     <div class="squareCraft-v-line"></div>
                     <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-2" width="12px"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">                  
                  </div>
               </div>
            </div>
           

         
            <div class="squareCraft-mt-2"> </div>
         </div>
         <div class="squareCraft-mt-4">
            <div
               class="squareCraft-flex  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
               <div
                  class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
                  Publish
               </div>
               <div
                  class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
                  Reset
               </div>
            </div>
          
         </div>
      </div>
    `
}
