
"use client"
import React, { useEffect ,useRef} from 'react';
import gsap from 'gsap';
// import LocomotiveScroll from 'locomotive-scroll';
import "./locomotivcss.css"
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Page = () => {

  // locomotivjs
  const main = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const mainvar = main.current;
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locoScroll = new LocomotiveScroll({
            el: mainvar,
            smooth: true,
          });
          locoScroll.on("scroll", ScrollTrigger.update);
      
          // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
          ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
              return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: mainvar.style.transform
              ? "transform"
              : "fixed",
          });
      
          // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
          ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      
          // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
          ScrollTrigger.refresh();
      
      
      }
    )()

  }, []);
  
  useEffect(() => {
    // scrolltigger
    
    // console.log(newVideo);
    gsap.to("#nav_part1 svg", {

      transform: "translateY(-100%)",
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top top",
        end: "top -7%",
        scrub: true,
        ease: 'power2.inOut',
        stagger: 0.3


      },
    });


    gsap.to("#nav_part2 #links", {
      transform: "translateY(-100%)",
      opacity: 0,
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
        stagger: 0.3
      },
    });
  }, []);
  const video = useRef(null);
  const play = useRef(null);

  useEffect(() => {
    // video animation
    const videoCont = video.current;
    // const videoCont = document.querySelector("#video-container");
    // const playbtn = document.querySelector("#play");
    const playbtn = play.current;
    videoCont.addEventListener("mouseenter", function () {
      gsap.to(playbtn, {
        scale: 1,
        opacity: 1
      })
    })
    videoCont.addEventListener("mouseleave", function () {
      gsap.to(playbtn, {
        scale: 0,
        opacity: 0
      })
    })
    videoCont.addEventListener("mousemove", function (dets) {
      gsap.to(playbtn, {
        left: dets.x + 50,
        top: dets.y + 50
      })
    })



  }, []);
  const child = useRef(null);

  useEffect(() => {
    // h1 animination
    gsap.from("#page1 h1", {
      y: 100,
      delay: 0.5,
      duration: 0.9,
      opacity: 0,
      stagger: 0.3


    });

    gsap.to("#page1  h1", {
      y: 0,
      delay: 0.5,
      duration: 0.9,
      opacity: 1,
      stagger: 0.3

    });
    // video animination
    gsap.from("#page1 #video-container", {
      delay: 0.5,
      duration: 0.9,
      opacity: 0,
      stagger: 0.3
    });

    gsap.to("#page1  #video-container", {
      delay: 0.5,
      duration: 0.9,
      opacity: 1,
      stagger: 0.3,
      scale: 1

    });

    const handleWindowMouseMove = (event) => {
      gsap.to("#coursor", {
        left: event.x,
        top: event.y
      })
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

   


    const a = document.querySelectorAll(".child");
    // const a = child.current;
    a.forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        gsap.to("#coursor", {
          transform: "translate(-50%,-50%) scale(1)"
        })
      });
      elem.addEventListener("mouseleave", function () {
        gsap.to("#coursor", {
          transform: "translate(-50%,-50%) scale(0)"
        })
      })
    });
    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);

  // details page


  return (
    <>
      <div id="nav">
        <div id="nav_part1">

          <svg width="106" height="83" viewBox="0 0 106 83" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "translate(0px, 0px)," }}><g clipPath="url(#clip0_2228_162)"><path d="M5.50062 6.4473H0V0.557617H17.7807V6.4473H12.2464V25.4842H5.50062V6.4473Z" fill="currentColor"></path><path d="M43.2791 12.4126C43.8662 14.6434 44.027 15.8982 44.0756 16.0715C44.386 14.504 44.629 13.2831 44.8235 12.4126L47.7402 0.56543H54.5571L47.5682 25.492H41.3047L38.2609 14.8582C38.0889 14.2327 37.8122 13.1173 37.4307 11.512C37.1204 12.8008 36.8773 13.9161 36.6006 14.8582L33.6091 25.492H27.3307L20.3418 0.56543H27.1549L29.9931 12.488C30.3035 13.7428 30.5466 14.9976 30.741 16.2185C30.9803 14.9298 31.2944 13.675 31.6048 12.488L34.7309 0.56543H40.1642L43.2791 12.4126Z" fill="currentColor"></path><path d="M76.5219 22.3113C74.173 24.6188 71.066 25.9784 67.7892 26.1326C64.5124 26.2867 61.2932 25.2248 58.7412 23.1478C57.3228 22.0067 56.1618 20.5745 55.3351 18.9463C54.5085 17.3181 54.0353 15.5313 53.9468 13.7045C53.8584 11.8778 54.1568 10.053 54.8223 8.35149C55.4877 6.64996 56.5049 5.11064 57.8063 3.83585C60.3099 1.37646 63.6678 0 67.1641 0C70.6604 0 74.0184 1.37646 76.5219 3.83585C77.7366 5.04162 78.7013 6.47878 79.3597 8.06372C80.0181 9.64865 80.3572 11.3497 80.3572 13.0679C80.3572 14.7861 80.0181 16.4872 79.3597 18.0721C78.7013 19.6571 77.7366 21.0942 76.5219 22.3V22.3113ZM73.6164 13.0604C73.6164 9.01712 70.9166 5.73879 67.1473 5.73879C63.378 5.73879 60.6782 8.98321 60.6782 13.0604C60.6782 17.1376 63.2023 20.382 67.1473 20.382C70.9876 20.382 73.6164 17.1413 73.6164 13.0604Z" fill="currentColor"></path><path d="M12.8 39.1893H26.0486C26.086 39.7131 26.086 40.203 26.086 40.6966C26.086 49.3069 21.2436 54.1905 13.2151 54.1905C9.27008 54.1905 6.19257 53.0374 3.70215 50.4939C1.3102 47.9834 -0.0176051 44.6329 0.000176313 41.1525C0.000176313 33.586 5.60923 28.1108 13.2151 28.1108C18.024 28.1108 21.797 30.0665 24.3547 33.8649L18.5101 36.6872C17.1265 34.7692 15.3952 33.831 13.2151 33.831C9.27008 33.831 6.71235 36.6194 6.71235 41.4314C6.71235 46.2434 9.23643 49.0658 13.2151 49.0658C16.7114 49.0658 19.1645 47.1138 19.5122 44.4271H12.7814L12.8 39.1893Z" fill="currentColor"></path><path d="M49.8502 50.4146C47.3392 52.8731 43.9766 54.249 40.4756 54.2506C37.4173 54.2246 34.4566 53.1629 32.0695 51.2361C30.6511 50.0946 29.49 48.662 28.6633 47.0335C27.8366 45.405 27.3634 43.6179 27.275 41.7909C27.1865 39.9638 27.485 38.1388 28.1504 36.4369C28.8159 34.7351 29.8332 33.1954 31.1347 31.9203C33.6382 29.4609 36.9961 28.0845 40.4924 28.0845C43.9887 28.0845 47.3467 29.4609 49.8502 31.9203C51.0649 33.1261 52.0296 34.5632 52.688 36.1482C53.3465 37.7331 53.6855 39.4342 53.6855 41.1524C53.6855 42.8706 53.3465 44.5717 52.688 46.1566C52.0296 47.7415 51.0649 49.1787 49.8502 50.3845V50.4146ZM46.9447 41.1486C46.9447 37.1054 44.2486 33.827 40.4756 33.827C36.7026 33.827 34.0065 37.0677 34.0065 41.1486C34.0065 45.2296 36.5306 48.4702 40.4756 48.4702C44.316 48.4702 46.9447 45.2258 46.9447 41.1486Z" fill="currentColor"></path><path d="M77.5629 50.4146C75.0506 52.871 71.6888 54.2466 68.1883 54.2506C65.129 54.224 62.1672 53.1624 59.7784 51.2361C58.3608 50.094 57.2004 48.6611 56.3745 47.0324C55.5485 45.4038 55.0758 43.6168 54.9877 41.7899C54.8997 39.9631 55.1983 38.1383 55.8637 36.4366C56.5292 34.735 57.5462 33.1955 58.8473 31.9203C61.3509 29.4609 64.7088 28.0845 68.2051 28.0845C71.7014 28.0845 75.0594 29.4609 77.5629 31.9203C78.7776 33.1261 79.7423 34.5632 80.4007 36.1482C81.0591 37.7331 81.3982 39.4342 81.3982 41.1524C81.3982 42.8706 81.0591 44.5717 80.4007 46.1566C79.7423 47.7415 78.7776 49.1787 77.5629 50.3845V50.4146ZM74.6574 41.1486C74.6574 37.1054 71.9576 33.827 68.1883 33.827C64.419 33.827 61.7192 37.0677 61.7192 41.1486C61.7192 45.2296 64.2433 48.4702 68.1883 48.4702C72.0286 48.4702 74.6574 45.2258 74.6574 41.1486Z" fill="currentColor"></path><path d="M83.7168 28.6606H89.6699C94.2693 28.6606 97.9713 28.7322 101.225 31.0346C104.336 33.2277 105.996 36.6869 105.996 41.1447C105.996 45.6024 104.336 49.0202 101.225 51.2547C98.1134 53.4893 94.718 53.5872 90.601 53.5872H83.7168V28.6606ZM91.5358 48.0103C96.6924 48.0103 99.1492 46.0245 99.1492 41.1447C99.1492 36.1933 96.6214 34.2413 91.5358 34.2413H90.3953V48.0103H91.5358Z" fill="currentColor"></path><path d="M18.9586 65.171C17.16 63.1474 15.4287 62.1564 13.2486 62.1564C9.34095 62.1564 6.74583 65.171 6.74583 69.3725C6.74583 73.2085 9.3073 76.3097 13.2486 76.3097C15.4287 76.3097 17.16 75.3338 18.9586 73.2952V80.7524C16.9763 81.7756 14.784 82.3175 12.5568 82.3351C5.25756 82.3351 0 76.777 0 69.2481C0 61.7193 5.25756 56.1763 12.5568 56.1763C14.7828 56.1891 16.975 56.7259 18.9586 57.7438V65.171Z" fill="currentColor"></path><path d="M42.4125 78.5214C40.0636 80.8289 36.9566 82.1885 33.6798 82.3426C30.403 82.4968 27.1838 81.4349 24.6318 79.3579C23.2135 78.2168 22.0524 76.7846 21.2258 75.1564C20.3991 73.5282 19.9259 71.7413 19.8375 69.9146C19.749 68.0879 20.0475 66.2631 20.7129 64.5616C21.3783 62.86 22.3956 61.3207 23.697 60.0459C26.1996 57.5922 29.5536 56.2192 33.0454 56.2192C36.5372 56.2192 39.8912 57.5922 42.3938 60.0459C43.6085 61.2517 44.5732 62.6889 45.2316 64.2738C45.8901 65.8587 46.2291 67.5598 46.2291 69.278C46.2291 70.9962 45.8901 72.6973 45.2316 74.2822C44.5732 75.8671 43.6085 77.3043 42.3938 78.5101L42.4125 78.5214ZM39.4883 69.2704C39.4883 65.2272 36.7922 61.9489 33.0192 61.9489C29.2462 61.9489 26.5501 65.1933 26.5501 69.2704C26.5501 73.3476 29.0742 76.5921 33.0192 76.5921C36.8596 76.5921 39.4883 73.3514 39.4883 69.2704Z" fill="currentColor"></path><path d="M49.8936 75.4543C50.5724 75.4475 51.238 75.6443 51.8057 76.0194C52.3733 76.3946 52.8176 76.9313 53.082 77.5614C53.3464 78.1915 53.4191 78.8865 53.2908 79.5583C53.1624 80.2301 52.8389 80.8483 52.3612 81.3344C51.8835 81.8205 51.2733 82.1526 50.608 82.2886C49.9426 82.4246 49.2522 82.3582 48.6244 82.098C47.9965 81.8378 47.4596 81.3954 47.0817 80.8271C46.7038 80.2587 46.502 79.59 46.502 78.9059C46.498 77.9951 46.853 77.12 47.4889 76.4728C48.1249 75.8256 48.9898 75.4593 49.8936 75.4543Z" fill="currentColor"></path></g><defs><clipPath id="clip0_2228_162"><rect width="106" height="82.3538" fill="white"></rect></clipPath></defs></svg>
          <svg width="62" height="63" viewBox="0 0 62 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="go1438215768" style={{ transform: "translate(0px, -88px)," }}><path d="M46.8316 0C42.9105 0 39.1501 1.59236 36.3775 4.42677C33.605 7.26119 32.0474 11.1055 32.0474 15.114C32.0474 19.1224 33.605 22.9667 36.3775 25.8011C39.1501 28.6355 42.9105 30.2279 46.8316 30.2279C50.7526 30.2279 54.513 28.6355 57.2856 25.8011C60.0582 22.9667 61.6158 19.1224 61.6158 15.114C61.6158 11.1055 60.0582 7.26119 57.2856 4.42677C54.513 1.59236 50.7526 0 46.8316 0Z" fill="currentColor"></path><path d="M14.793 0C10.872 0 7.11154 1.59236 4.33897 4.42677C1.56639 7.26119 0.00878906 11.1055 0.00878906 15.114C0.00878906 19.1224 1.56639 22.9667 4.33897 25.8011C7.11154 28.6355 10.872 30.2279 14.793 30.2279C18.714 30.2279 22.4744 28.6355 25.247 25.8011C28.0196 22.9667 29.5772 19.1224 29.5772 15.114C29.5772 11.1055 28.0196 7.26119 25.247 4.42677C22.4744 1.59236 18.714 0 14.793 0Z" fill="currentColor"></path><path d="M36.9805 32.7422L32.0366 37.7963L56.6819 62.9913L61.6258 57.9372L36.9805 32.7422Z" fill="currentColor"></path><path d="M56.6836 32.7485L32.0383 57.9435L36.9822 62.9976L61.6275 37.8026L56.6836 32.7485Z" fill="currentColor"></path><path d="M4.94386 32.7464L0 37.8005L24.6453 62.9955L29.5892 57.9414L4.94386 32.7464Z" fill="currentColor"></path><path d="M24.647 32.7527L0.00170898 57.9477L4.94557 63.0018L29.5909 37.8068L24.647 32.7527Z" fill="currentColor"></path></svg>
        </div>
        <div id="nav_part2">
          <div id="links">


            <a href="#">Shop</a>
            <a href="#">Catering</a>
            <a href="#">Donate</a>
          </div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path></svg> */}
          <div id="icon">
            <i className="ri-menu-3-fill"></i>
            <i className="ri-shopping-cart-line"></i>
          </div>
        </div>
      </div>

      <div id="coursor"></div>
      <div id="main" ref={main} data-scroll-container>
        <div id="page1">
          <h1>change </h1>
          <h1>the course</h1>
          <div id="video-container" ref={video}>
            <div id="play" ref={play}>Play</div>
            <video autoPlay loop muted src="video.mp4"></video>
          </div>

        </div>

        <div id="page2">
          <div id="element1" className="element">
            <img data-scroll data-scroll-speed="1" src="https://cdn.sanity.io/images/w8f1ak3c/production/f445a3d15e318fd217579e88ec2c6d0140246403-3574x4467.jpg/DSC0078_Dexter%20Kim.jpg?rect=448,0,2679,4467&w=640&h=1067&fit=min&auto=format" alt="" />
            <div className="box" data-scroll data-scroll-speed="-2">

              <div className='dets'>
                <div className="pageinfo1">
                  <div id="left" ><i className="ri-checkbox-blank-circle-fill"></i></div>
                  <div id="item"> <p>Shop</p><p>NEW GOODIES</p></div>
                  <div id="right"><i className="ri-arrow-right-s-line"></i></div>
                </div>
                <div className="pageinfo2">
                  <div className="product1">
                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/7a2007de38624a0b2935416bf51a4584889aa232-5000x5000.png/Website%20Products%20(12).png?w=320&h=320&auto=format" alt="" />
                    <p>TWO GOOD TOTE BAG</p>
                  </div>
                  <div className="product2">

                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/7d180ca25ade6277a215b634318056d551de9da8-5000x5000.png/Website%20Products%20(5).png?w=320&h=320&auto=format" alt="" />
                    <p> TWO GOOD CO. HOODIE</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div id="element2" className="element">
            <img data-scroll data-scroll-speed="1" src="https://cdn.sanity.io/images/w8f1ak3c/production/90d06c39f74f1365c801ec2a063227969c5ef940-2560x3840.jpg/LucyTweed_Photo:KatieKarrs.jpg?rect=129,0,2303,3840&w=640&h=1067&fit=min&auto=format" alt="" />
            <div className="box" data-scroll data-scroll-speed="-2">
              <div className='dets'>
                <div className="pageinfo1">
                  <div id="left" ><i className="ri-checkbox-blank-circle-fill"></i></div>
                  <div id="item"> <p>Shop</p><p>NEW BOOKS</p></div>
                  <div id="right"><i className="ri-arrow-right-s-line"></i></div>
                </div>
                <div className="pageinfo2">
                  <div className="product1">
                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/ff380ebfee344ff98d24d4156ded6b9dc22a2a2a-5000x5000.png/Change-The-Course-Cookbook-Two-Good-Co.png?w=320&h=320&auto=format" alt="" />
                    <p>CHANGE THE COURSE COOKBOOK</p>
                  </div>
                  <div className="product2">

                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/4206e9c3f7ab098369c39a2194b82eeca6bb0664-6166x4111.png/DSC0005_Dexter%20Kim.png?rect=0,4,6166,4104&w=320&h=213&auto=format" alt="" />
                    <p> THE COOKBOOK DUO</p>
                  </div>
                </div>
              </div>

            </div>


          </div>
          <div id="element3" className="element">
            <img data-scroll data-scroll-speed="1" src="https://cdn.sanity.io/images/w8f1ak3c/production/d3151106849ff2494d66916cf554c68a0603444d-902x1500.png/Rectangle%20220.png?rect=1,0,900,1500&w=640&h=1067&fit=min&auto=format" alt="" />
            <div className="box" data-scroll data-scroll-speed="-2">
              <div className='dets'>
                <div className="pageinfo1">
                  <div id="left" ><i className="ri-checkbox-blank-circle-fill"></i></div>
                  <div id="item"> <p>Shop</p><p>BATH</p></div>
                  <div id="right"><i className="ri-arrow-right-s-line"></i></div>
                </div>
                <div className="pageinfo2">
                  <div className="product1">
                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/99866b12faf44f7490e6037dc197947334ce0a72-1408x1408.png/Nourish%20&%20Soothe%20Hand%20Lotion%20Two%20Good%20Co.png?w=320&h=320&auto=format" alt="" />
                    <p>CLEANSE & NOURISH HAND WASH</p>
                  </div>
                  <div className="product2">

                    <img src="https://cdn.sanity.io/images/w8f1ak3c/production/99866b12faf44f7490e6037dc197947334ce0a72-1408x1408.png/Nourish%20&%20Soothe%20Hand%20Lotion%20Two%20Good%20Co.png?w=320&h=320&auto=format" alt="" />
                    <p> NOURISH & SOOTHE HAND LOTION</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
        <div className="heading" data-scroll data-scroll-speed="1">
          <div><h1>WE BELIEVE IN PEOPLE, UNTIL THEY BELIEVE IN THEMSELVES AGAIN.</h1></div>
          <div><h1>Everything we do is designed to rebuild self worth and independence, in order to break free from the cycle of disadvantage.</h1><h1>
            With every purchase you make with us, you{"'"}re helping to change the course of someone{"'"}s life; you{"'"}re walking alongside vulnerable women as they find their way home again.</h1></div>

        </div>
        <div id="page3">

          <div className="child" ref={child} id="child1"><img src="https://cdn.sanity.io/images/w8f1ak3c/production/d6a2a4be8e3063d64648773f57f5f447609a93ab-5000x5000.png/Love-Care-Pack-Expanded-Two-Good-Co.png?w=1024&h=1024&auto=format" alt="img" />
            <div className='price'>
              <Link href={""}>THE LOVE + CARE PACK <br />
                $50</Link>
            </div>

          </div>

          <div className="child" id="child2"><img src="https://cdn.sanity.io/images/w8f1ak3c/production/7a2007de38624a0b2935416bf51a4584889aa232-5000x5000.png/Website%20Products%20(12).png?w=1024&h=1024&auto=format" alt="img" />
            <div className='price'>
              <Link href={""}>TWO GOOD TOTE BAG <br />
                $40</Link>
            </div>
          </div>

          <div className="child" id="child3"><img src="https://cdn.sanity.io/images/w8f1ak3c/production/99866b12faf44f7490e6037dc197947334ce0a72-1408x1408.png/Nourish%20&%20Soothe%20Hand%20Lotion%20Two%20Good%20Co.png?w=1024&h=1024&auto=format" alt="img" />
            <div className='price'>
              <Link href={""}>
                NOURISH & SOOTHE HAND LOTION <br />
                $40</Link>
            </div>
          </div>

          <div className="child" id="child4"><img src="https://cdn.sanity.io/images/w8f1ak3c/production/02240d01db2e8bdc5c630e9832ff7e0c7614f733-1876x1876.png/Cookbook-Two-Recipes-For-Resilience-Two-Good-Co.png?w=1024&h=1024&auto=format" alt="img" />
            <div className='price'>
              <Link href={""}>COOKBOOK TWO <br />
                $45</Link>
            </div>
          </div>

        </div>

        <div className="page4">
          <div className="page4left">
            WORDS OF GOODNESS
          </div>
          <div className="page4right">MESSAGES OF LOVE & SUPPORT</div>
          <div className="line"></div>

          <div className="page4_heading">
            <p> EVERYONE AT TWO <br />
              GOOD ARE LOVELY TO <br />
              WORK WITH. CATERING <br />
              WAS EXCELLENT AND <br />
              WELL PRICED, ALL FOR A <br />
              GOOD CAUSE... WHAT{"'"}S <br />
              NOT TO LOVE?.</p>
          </div>
        </div>
        {/* <div id="user">
          <div id="element1" className="userinfo">
            <div className="userbox" data-scroll data-scroll-speed="-2">

              <div className='userdetails'>
                <div className="pageInfromation">
                 
                  <div id="item"> <p>Shop NEW GOODIES</p></div>
                </div>
                <div className="pageinfo2">
                  hdgdgdf
                </div>

              </div>
            </div>
            </div>
        </div> */}
      </div>
    </>
  );
}

export default Page;
