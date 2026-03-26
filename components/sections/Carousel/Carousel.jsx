'use client'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import './Carousel.css'

function Carousel() {
  const { content: siteContent, ui: uiContent } = useLanguage()
  const [gsap, setGsap] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [resizeKey, setResizeKey] = useState(0)
  const initRef = useRef(false)
  const autoPlayRef = useRef(null)
  const resizeTimerRef = useRef(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load GSAP only on desktop
  useEffect(() => {
    if (!isMobile) {
      import('gsap').then((module) => {
        setGsap(module.gsap || module.default)
      })
    }
    initRef.current = false
  }, [isMobile])

  // Debounced resize → re-run GSAP init with fresh dimensions (fixes black spots on resize)
  useEffect(() => {
    if (isMobile) return
    const handleResize = () => {
      clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(() => {
        setResizeKey(k => k + 1)
      }, 350)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimerRef.current)
    }
  }, [isMobile])

  // Mobile auto-play
  useEffect(() => {
    if (isMobile) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % siteContent.carrouselContent.length)
      }, 5000)
      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      }
    }
  }, [isMobile, currentSlide])

  // Desktop GSAP initialization
  useEffect(() => {
    if (!gsap || initRef.current || isMobile) return
    initRef.current = true

    // Control flags — plain object so all closures share the same reference
    const ctrl = { isRunning: true, isAnimating: false }

    const data = siteContent.carrouselContent
    let order = data.map((_, i) => i)
    let detailsEven = true
    const ease = "sine.inOut"

    const { innerHeight: height, innerWidth: width } = window
    // < 1400px: only 1 thumbnail fits (pushed to right edge), no text overlap
    const isTablet   = width < 1400
    const carouselHeight = height * 0.7
    const offsetTop  = carouselHeight - 280
    const offsetLeft = isTablet ? width - 280 : width - 830
    const progressWidth = isTablet ? 80 : 500
    const cardWidth  = 200
    const cardHeight = 240
    const gap        = 40
    const numberSize = 50

    const getCard        = (i) => `#carousel-card-${i}`
    const getCardContent = (i) => `#carousel-card-content-${i}`
    const getSliderItem  = (i) => `#carousel-slide-item-${i}`

    const animate = (target, duration, properties) =>
      new Promise((resolve) => gsap.to(target, { ...properties, duration, onComplete: resolve }))

    // Update details panel text for the active details element
    const updateDetails = (detailsActive) => {
      const activeData = data[order[0]]
      const placeEl = document.querySelector(`${detailsActive} .carousel-place-text`)
      if (placeEl) placeEl.textContent = activeData.sponsored ? uiContent.carousel.featuredLabel : uiContent.carousel.specialLabel
      const titleWords = activeData.title.split(' ')
      const mid = Math.ceil(titleWords.length / 2)
      const t1 = document.querySelector(`${detailsActive} .carousel-title-1`)
      const t2 = document.querySelector(`${detailsActive} .carousel-title-2`)
      const d  = document.querySelector(`${detailsActive} .carousel-desc`)
      if (t1) t1.textContent = titleWords.slice(0, mid).join(' ')
      if (t2) t2.textContent = titleWords.slice(mid).join(' ')
      if (d)  d.textContent  = activeData.description
    }

    // Animate the active details panel sliding in
    const animateDetailsIn = (detailsActive, detailsInactive, resolve) => {
      gsap.set(detailsActive, { zIndex: 22 })
      gsap.to(detailsActive,  { opacity: 1,  delay: 0.4,  ease })
      gsap.to(`${detailsActive} .carousel-text`,    { y: 0, delay: 0.10, duration: 0.7, ease })
      gsap.to(`${detailsActive} .carousel-title-1`, { y: 0, delay: 0.15, duration: 0.7, ease })
      gsap.to(`${detailsActive} .carousel-title-2`, { y: 0, delay: 0.15, duration: 0.7, ease })
      gsap.to(`${detailsActive} .carousel-desc`,    { y: 0, delay: 0.30, duration: 0.4, ease })
      gsap.to(`${detailsActive} .carousel-cta`,     { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease })
      gsap.set(detailsInactive, { zIndex: 12 })
    }

    // Reset the inactive details panel (hide + push text out)
    const resetDetailsInactive = (detailsInactive) => {
      gsap.set(detailsInactive, { opacity: 0 })
      gsap.set(`${detailsInactive} .carousel-text`,    { y: 100 })
      gsap.set(`${detailsInactive} .carousel-title-1`, { y: 100 })
      gsap.set(`${detailsInactive} .carousel-title-2`, { y: 100 })
      gsap.set(`${detailsInactive} .carousel-desc`,    { y: 50 })
      gsap.set(`${detailsInactive} .carousel-cta`,     { y: 60 })
    }

    // ── INIT ──────────────────────────────────────────────────────────────
    const init = () => {
      const [active, ...rest] = order
      const detailsActive   = detailsEven ? "#carousel-details-even" : "#carousel-details-odd"
      const detailsInactive = detailsEven ? "#carousel-details-odd"  : "#carousel-details-even"

      gsap.set("#carousel-pagination", { top: offsetTop - 70, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 })
      gsap.set(getCard(active),        { x: 0, y: 0, width: Math.min(width, window.innerWidth), height: carouselHeight, zIndex: 20 })
      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })
      gsap.set(detailsActive,          { opacity: 0, zIndex: 22, x: -200 })
      gsap.set(detailsInactive,        { opacity: 0, zIndex: 12 })
      resetDetailsInactive(detailsInactive)

      gsap.set(".carousel-progress-foreground", { width: progressWidth * (1 / order.length) * (active + 1) })

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10,
        })
        gsap.set(getCardContent(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          zIndex: 40, y: offsetTop + cardHeight - 100,
        })
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize })
      })

      gsap.set(".carousel-indicator", { x: -width })

      const startDelay = 0.6
      gsap.to(".carousel-cover", {
        x: width + 400, delay: 0.5, ease,
        onComplete: () => {
          const cover = document.querySelector('.carousel-cover')
          if (cover) cover.style.display = 'none'
          setTimeout(() => { loop() }, 500)
        },
      })

      rest.forEach((i, index) => {
        gsap.to(getCard(i),        { x: offsetLeft + index * (cardWidth + gap), zIndex: 30, delay: 0.05 * index + startDelay, ease })
        gsap.to(getCardContent(i), { x: offsetLeft + index * (cardWidth + gap), zIndex: 40, delay: 0.05 * index + startDelay, ease })
      })

      gsap.to("#carousel-pagination", { y: 0, opacity: 1, ease, delay: startDelay })
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay })
    }

    // ── STEP FORWARD ──────────────────────────────────────────────────────
    // Identical to the original autoreplay step.
    // First thumbnail expands → previous big card shrinks to last thumbnail slot.
    // Thumbnails slide LEFT.
    const stepForward = () => {
      return new Promise((resolve) => {
        order.push(order.shift())
        detailsEven = !detailsEven

        const detailsActive   = detailsEven ? "#carousel-details-even" : "#carousel-details-odd"
        const detailsInactive = detailsEven ? "#carousel-details-odd"  : "#carousel-details-even"

        updateDetails(detailsActive)
        animateDetailsIn(detailsActive, detailsInactive, resolve)

        const [active, ...rest] = order
        const prv = rest[rest.length - 1]   // was the big card → becomes last thumbnail

        gsap.set(getCard(prv),    { zIndex: 10 })
        gsap.set(getCard(active), { zIndex: 20 })
        gsap.to(getCard(prv), { scale: 1.5, ease })

        gsap.to(getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease })
        gsap.to(getSliderItem(active),  { x: 0, ease })
        gsap.to(getSliderItem(prv),     { x: -numberSize, ease })
        gsap.to(".carousel-progress-foreground", { width: progressWidth * (1 / order.length) * (active + 1), ease })

        gsap.to(getCard(active), {
          x: 0, y: 0, ease,
          width: Math.min(width, window.innerWidth),
          height: carouselHeight,
          borderRadius: 0,
          onComplete: () => {
            // Snap the previous big card to the far-right thumbnail slot
            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap)
            gsap.set(getCard(prv), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10, scale: 1 })
            gsap.set(getCardContent(prv), { x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40 })
            gsap.set(getSliderItem(prv), { x: rest.length * numberSize })
            resetDetailsInactive(detailsInactive)
          },
        })

        // Remaining thumbnails shift LEFT
        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap)
            gsap.set(getCard(i), { zIndex: 30 })
            gsap.to(getCard(i),        { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.1 * (index + 1) })
            gsap.to(getCardContent(i), { x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1) })
            gsap.to(getSliderItem(i),  { x: (index + 1) * numberSize, ease })
          }
        })
      })
    }

    // ── STEP BACKWARD ─────────────────────────────────────────────────────
    // Reversed direction:
    // Last thumbnail (rightmost) expands → previous big card shrinks to FIRST thumbnail slot.
    // Thumbnails slide RIGHT.
    const stepBack = () => {
      return new Promise((resolve) => {
        // Move the last item to the front
        order.unshift(order.pop())
        detailsEven = !detailsEven

        const detailsActive   = detailsEven ? "#carousel-details-even" : "#carousel-details-odd"
        const detailsInactive = detailsEven ? "#carousel-details-odd"  : "#carousel-details-even"

        updateDetails(detailsActive)
        animateDetailsIn(detailsActive, detailsInactive, resolve)

        const [active, ...rest] = order
        // active   = was the rightmost thumbnail → expands to fullscreen
        // prvBig   = rest[0] = was the big card  → shrinks to first/leftmost thumbnail
        const prvBig = rest[0]

        gsap.set(getCard(prvBig),  { zIndex: 10 })
        gsap.set(getCard(active),  { zIndex: 20 })
        gsap.to(getCard(prvBig), { scale: 1.5, ease })

        gsap.to(getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease })
        gsap.to(getSliderItem(active),  { x: 0, ease })
        gsap.to(getSliderItem(prvBig),  { x: -numberSize, ease })
        gsap.to(".carousel-progress-foreground", { width: progressWidth * (1 / order.length) * (active + 1), ease })

        gsap.to(getCard(active), {
          x: 0, y: 0, ease,
          width: Math.min(width, window.innerWidth),
          height: carouselHeight,
          borderRadius: 0,
          onComplete: () => {
            // Snap the previous big card to the FIRST (leftmost) thumbnail slot
            const xNew = offsetLeft + 0
            gsap.set(getCard(prvBig), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 10, scale: 1 })
            gsap.set(getCardContent(prvBig), { x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40 })
            gsap.set(getSliderItem(prvBig), { x: 1 * numberSize })
            resetDetailsInactive(detailsInactive)
          },
        })

        // Remaining thumbnails (skip prvBig at index 0) shift RIGHT
        // rest = [prvBig, B, C, ...]
        // index 0 → prvBig (skipped, handled above)
        // index 1 → B goes to slot 1
        // index 2 → C goes to slot 2
        rest.forEach((i, index) => {
          if (i !== prvBig) {
            const xNew = offsetLeft + index * (cardWidth + gap)
            gsap.set(getCard(i), { zIndex: 30 })
            gsap.to(getCard(i),        { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.1 * (index + 1) })
            gsap.to(getCardContent(i), { x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1) })
            gsap.to(getSliderItem(i),  { x: (index + 1) * numberSize, ease })
          }
        })
      })
    }

    const loopId = { current: 0 }


    // ── AUTOREPLAY LOOP ───────────────────────────────────────────────────
    const loop = async () => {
      const id = ++loopId.current

      while (ctrl.isRunning && id === loopId.current) {

        gsap.killTweensOf(".carousel-indicator")
        gsap.set(".carousel-indicator", { clearProps: "all" })
        gsap.set(".carousel-indicator", { x: -width })

        // 2s sweep
        await new Promise((resolve) => {
          gsap.to(".carousel-indicator", {
            x: 0,
            duration: 2,
            ease: "none",
            overwrite: "auto",
            onComplete: resolve,
          })
        })

        if (!ctrl.isRunning || id !== loopId.current) break

        // 0.3 delay + 0.8 exit
        await new Promise((resolve) => {
          gsap.to(".carousel-indicator", {
            x: width,
            duration: 0.8,
            delay: 0.3,
            ease: "none",
            overwrite: "auto",
            onComplete: resolve,
          })
        })

        if (!ctrl.isRunning || id !== loopId.current) break

        gsap.set(".carousel-indicator", { x: -width })

        await stepForward()
      }
    }



    // ── ARROW CLICK HANDLERS ──────────────────────────────────────────────
    const handleRightClick = async () => {
      if (ctrl.isAnimating) return
      ctrl.isAnimating = true

      // Invalidate current autoplay loop
      loopId.current++

      gsap.killTweensOf(".carousel-indicator")
      gsap.set(".carousel-indicator", { x: -width })

      await stepForward()

      ctrl.isAnimating = false

      // Restart fresh autoplay loop
      ctrl.isRunning = true
      loop()
    }


  const handleLeftClick = async () => {
    if (ctrl.isAnimating) return
    ctrl.isAnimating = true

    loopId.current++

    gsap.killTweensOf(".carousel-indicator")
    gsap.set(".carousel-indicator", { x: -width })

    await stepBack()

    ctrl.isAnimating = false

    ctrl.isRunning = true
    loop()
  }


    // Attach handlers after the DOM is ready
    const rightBtn = document.querySelector('.carousel-arrow-right')
    const leftBtn  = document.querySelector('.carousel-arrow-left')
    rightBtn?.addEventListener('click', handleRightClick)
    leftBtn?.addEventListener('click',  handleLeftClick)

    init()

    return () => {
      ctrl.isRunning = false
      gsap.killTweensOf("*")
      initRef.current = false
      rightBtn?.removeEventListener('click', handleRightClick)
      leftBtn?.removeEventListener('click',  handleLeftClick)
    }
  }, [gsap, isMobile, resizeKey])

  // ── MOBILE RENDERING ─────────────────────────────────────────────────────
  if (isMobile) {
    const data = siteContent.carrouselContent
    const currentData = data[currentSlide]
    const titleWords = currentData.title.split(' ')
    const midPoint = Math.ceil(titleWords.length / 2)
    const title1 = titleWords.slice(0, midPoint).join(' ')
    const title2 = titleWords.slice(midPoint).join(' ')

    return (
      <div className="carousel-container w-full carousel-mobile">
        <div className="carousel-indicator-mobile">
          <div className="carousel-indicator-progress" key={currentSlide}></div>
        </div>

        <div className="carousel-slides-mobile">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-slide-mobile ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="carousel-slide-overlay"></div>
            </div>
          ))}
        </div>

        <div className="carousel-details">
          <div className="carousel-place-box">
            <div className="carousel-text">
              {currentData.sponsored ? uiContent.carousel.featuredLabel : uiContent.carousel.specialLabel}
            </div>
          </div>
          <div className="carousel-title-box-1">
            <div className="carousel-title-1">{title1}</div>
          </div>
          <div className="carousel-title-box-2">
            <div className="carousel-title-2">{title2}</div>
          </div>
          <div className="carousel-desc">{currentData.description}</div>
          <div className="carousel-cta">
            <button className="carousel-bookmark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="carousel-discover">{uiContent.carousel.discoverButton}</button>
          </div>
        </div>

        <div className="carousel-dots-mobile">
          {data.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    )
  }

  // ── DESKTOP RENDERING (GSAP) ──────────────────────────────────────────────
  const data = siteContent.carrouselContent
  const firstItem = data[0]
  const firstWords = firstItem.title.split(' ')
  const firstMid = Math.ceil(firstWords.length / 2)
  const firstTitle1 = firstWords.slice(0, firstMid).join(' ')
  const firstTitle2 = firstWords.slice(firstMid).join(' ')
  const firstPlaceLabel = firstItem.sponsored ? uiContent.carousel.featuredLabel : uiContent.carousel.specialLabel

  return (
    <div className="carousel-container">

      <div className="carousel-clip-area">
        <div id="carousel-demo">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="carousel-card"
              id={`carousel-card-${index}`}
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
          ))}

          {data.map((item, index) => (
            <div key={`content-${item.id}`} className="carousel-card-content" id={`carousel-card-content-${index}`}>
              <div className="carousel-content-start"></div>
              <div className="carousel-content-place">{item.sponsored ? uiContent.carousel.featuredLabel : uiContent.carousel.specialLabel}</div>
              <div className="carousel-content-title-1">
                {item.title.split(' ').slice(0, Math.ceil(item.title.split(' ').length / 2)).join(' ')}
              </div>
              <div className="carousel-content-title-2">
                {item.title.split(' ').slice(Math.ceil(item.title.split(' ').length / 2)).join(' ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {['carousel-details-even', 'carousel-details-odd'].map((id) => (
        <div className="carousel-details" id={id} key={id}>
          <div className="carousel-place-box">
            <div className="carousel-text carousel-place-text">{firstPlaceLabel}</div>
          </div>
          <div className="carousel-title-box-1">
            <div className="carousel-title-1">{firstTitle1}</div>
          </div>
          <div className="carousel-title-box-2">
            <div className="carousel-title-2">{firstTitle2}</div>
          </div>
          <div className="carousel-desc">{firstItem.description}</div>
          <div className="carousel-cta">
            <button className="carousel-bookmark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="carousel-discover">{uiContent.carousel.discoverButton}</button>
          </div>
        </div>
      ))}

      <div className="carousel-pagination" id="carousel-pagination">
        <div className="carousel-arrow carousel-arrow-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="carousel-arrow carousel-arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="carousel-progress-container">
          <div className="carousel-progress-background">
            <div className="carousel-progress-foreground"></div>
          </div>
        </div>
        <div className="carousel-slide-numbers">
          {data.map((_, index) => (
            <div key={index} className="carousel-slide-item" id={`carousel-slide-item-${index}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-cover"></div>
    </div>
  )
}

export default Carousel