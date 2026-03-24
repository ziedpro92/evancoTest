// 'use client'
// import { useEffect, useRef } from 'react'
// import { useLanguage } from '@/contexts/LanguageContext'

// function Carrousel() {
//   const { content: siteContent } = useLanguage()

//   const carrouselRef = useRef(null)
//   const listRef = useRef(null)
//   const thumbnailRef = useRef(null)
//   const prevRef = useRef(null)
//   const nextRef = useRef(null)

//   useEffect(() => {
//     const carrousel = carrouselRef.current
//     const carrouselList = listRef.current
//     const thumbnail = thumbnailRef.current
//     const prev = prevRef.current
//     const next = nextRef.current

//     if (!carrousel || !carrouselList || !thumbnail || !prev || !next) return

//     let timeRuning = 3000
//     let timeAutoNext = 4000
//     let runTimeOut
//     let runAutoPlay

//     const showSlider = (type) => {
//       const sliderItems = carrouselList.querySelectorAll('.list__items')
//       const thumbnailItems = thumbnail.querySelectorAll('.thumbnail__items')

//       // Remove any existing animation classes
//       carrousel.classList.remove('next', 'prev')

//       if (type === 'next') {
//         carrouselList.appendChild(sliderItems[0])
//         thumbnail.appendChild(thumbnailItems[0])
//         carrousel.classList.add('next')
//       } else {
//         const lastIndex = sliderItems.length - 1
//         carrouselList.prepend(sliderItems[lastIndex])
//         thumbnail.prepend(thumbnailItems[lastIndex])
//         carrousel.classList.add('prev')
//       }

//       clearTimeout(runTimeOut)
//       clearTimeout(runAutoPlay)
      
//       runTimeOut = setTimeout(() => {
//         carrousel.classList.remove('next', 'prev')
//       }, timeRuning)

//       runAutoPlay = setTimeout(() => {
//         showSlider('next')
//       }, timeAutoNext)
//     }

//     const handleNext = () => showSlider('next')
//     const handlePrev = () => showSlider('prev')

//     next.addEventListener('click', handleNext)
//     prev.addEventListener('click', handlePrev)

//     runAutoPlay = setTimeout(() => {
//       showSlider('next')
//     }, timeAutoNext)

//     return () => {
//       next.removeEventListener('click', handleNext)
//       prev.removeEventListener('click', handlePrev)
//       clearTimeout(runTimeOut)
//       clearTimeout(runAutoPlay)
//     }
//   }, [])

//   // Create offset array for thumbnails - first thumbnail shows the next image
//   const getThumbnailContent = () => {
//     const content = [...siteContent.carrouselContent]
//     // Move first item to end, so thumbnails start with the second item
//     content.push(content.shift())
//     return content
//   }

//   return (
//     <div className="carrousel" ref={carrouselRef}>
      
//       <div className="carrousel__list" ref={listRef}>
//         {siteContent.carrouselContent.map((item) => (
//           <div key={item.id} className="list__items">
//             <div className="list__items__overlay"></div>

//             <img
//               className="carrousel_img"
//               src={item.img}
//               alt={`Carrousel Item ${item.id}`}
//             />

//             <div className="list__items__content">
//               {/* <span className="carrousel_sponsored capitalize">
//                 {item.sponsored ? 'Sponsored' : ''}
//               </span> */}
//               <h2 className="carrousel_title">{item.title}</h2>
//               <p className="carrousel_description">{item.description}</p>
//               <button className="carrousel_button">
//                 {item.primaryButton}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ********************* thumbnail ***************************** */}

//       <div className="carrousel__thumbnail" ref={thumbnailRef}>
//         {getThumbnailContent().map((item) => (
//           <div key={item.id} className="thumbnail__items">
//             <div className="thumbnail__items__overlay"></div>

//             <img
//               className="thumbnail_img"
//               src={item.img}
//               alt={`Thumbnail Item ${item.id}`}
//             />

//             <div className="thumbnail__items__content">
//               <span className="thumbnail_title">{item.title}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ********************* arrows ***************************** */}

//       <div className="carrousel__arrows">
//         <button id="prev" ref={prevRef}>{'<'}</button>
//         <button id="next" ref={nextRef}>{'>'}</button>
//       </div>

//     </div>
//   )
// }

// export default Carrousel