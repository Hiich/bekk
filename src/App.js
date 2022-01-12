import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NavBar } from './components/Navbar'
import one from './images/one.png'
import { Col, Container, Image, Row, Accordion } from 'react-bootstrap'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Footer } from './components/Footer'
import Slider from 'react-slick'
import layer1 from './images/music-Studio-layer-1.png'
import layer2 from './images/music-Studio-layer-2.png'
import guitar from './images/gitter.png'
import nft21 from './videos/Nft-2-1.mp4'
import BottomImage from './images/blue_bg.png'
import BottomImage2 from './images/sec3_bg_img (1).png'
import TheArtist from './images/The-artist.png'
import Community from './images/Community.png'
import AccessPass from './images/Access-pass.png'
import Metaverse from './images/Metaverse.png'
import nft107 from './videos/Nft-107-8.mp4'
import nft11 from './videos/Nft-11-1.mp4'
import nft120 from './videos/Nft-120-21.mp4'
import nft171 from './videos/Nft-171-72.mp4'
import nft95 from './videos/Nft-95-119.mp4'
import nftSuper1 from './videos/Nft-Super-1-Finish-1.mp4'
import nftSuper4 from './videos/Nft-Super-4-Finish-4.mp4'
import guitarBlue from './images/guitar_blue.png'
import imgLeft from './images/concept.jpg'
import conceptBG from './images/light_grey.png'
import conceptBGImage from './images/section10_bg_img.png'
import accordionIcon from './images/accordion_icon.png'
import saxophone from './images/sexophone.png'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './redux/store'
import blockchainReducer from './redux/blockchain/blockchainReducer'
import Hofa from '../src/images/Hofa.png'
import belairfineart from '../src/images/belairfineart.png'
import { Prev } from 'react-bootstrap/esm/PageItem'
import prev from '../src/images/left-arrow.png'
import Next from '../src/images/right-arrow.png'

function App() {
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '0x9f4375a632e982ea282214f8d8d9531262fa34a9 ',
    SCAN_LINK: '',
    NETWORK: {
      NAME: 'Ethereum',
      SYMBOL: 'ETH',
      ID: 1,
    },
    NFT_NAME: 'Bekk',
    SYMBOL: 'BK',
    MAX_SUPPLY: 170,
    WEI_COST: 300000000000000000,
    DISPLAY_COST: 0.3,
    GAS_LIMIT: 180000,
    MARKETPLACE: 'Opensea',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  })

  const html = document.documentElement
  const accordianData = [
    {
      title1: 'STEP 1',
      title2: 'Minting',
      data:
        'The mint starts on 10th January 2022  18:00 CEST time. Everyone that is whitelisted has a 24-hour window to mint their reserved NFT. The mint price is 0.3 ETH. The reveal will happen once the collection is sold out, after that you will be able to purchase on the secondary market through Opensea.',
    },
    {
      title1: 'STEP 2',
      title2: 'Metaverse development',
      data:
        'Signature of long-term partnership with LandVault to design & integrate music contest on our Sandbox Metaverse estate.',
      data:
        'We will start by creating a social hub and a few games on a 1x1 land on our 3x3 and continue building from there! Signature of long-term partnership with LandVault to finish our Art Center on Sandbox. It will start with a social hub and contests on a specific part of our 3x3 land, before expanding to the rest of the services!',
    },
    {
      title1: 'STEP 3',
      title2: 'Partnerships',
      data:
        'Partnerships with talent agencies and music labels. Holding one of our NFT will give you the chance to show your talent in front of music celebrities in the Metaverse.',
    },
    {
      title1: 'STEP 4',
      title2: '3D instruments collection',
      data:
        'Mint of the 3D music instrument collection. Holders of Louis Bekk NFTs will have free and exclusive access to the mint.',
    },
  ]

  const [isImageVisible, setImageVisible] = useState(false)

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })

  const onScroll = () => {
    if (document.getElementById('section2')) {
      const image = document.getElementById('Image')
      const top = document.getElementById('section2').getBoundingClientRect()
        .top
      if (top < image.clientHeight && !image.classList.contains('active')) {
        image.classList.add('active')
        image.addEventListener('animationend', () => {
          // image.classList.remove('active');
        })
      }
    }
    const guitar = document.getElementById('BlueGuitar')
    if (
      guitar.parentElement.getBoundingClientRect().top <
      guitar.clientHeight * 3
    ) {
      guitar.className = 'imganim'
    } else {
      guitar.className = 'img'
    }
  }

  const GuitarBanner = () => {
    return (
      <div className="background bg_section_one">
        <div className="back_two_img"></div>
        <div className="img_ani">
          <div className="animated one">
            <img src={layer1} width={'100%'} alt="Layer-1" />
          </div>
          <div className="animated two animated_div" id="animated_div">
            <img src={guitar} width={'100%'} alt="Layer-2" />
          </div>
          <div className="animated three">
            <img src={layer2} width={'100%'} alt="Layer-3" />
          </div>
        </div>
        <div id="section2" className="section2_img">
          <video
            id="Image"
            autoPlay
            loop
            muted
            playsInline="true"
            className="Image"
            src={nft21}
            alt="sample"
          />
          <img
            className="image-background"
            src={conceptBG}
            alt="ConceptImageBackground"
          />
        </div>
      </div>
    )
  }

  const SoundAndMusic = () => {
    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)
    const [claimingStatus, setClaimingStatus] = useState('Connect')

    const getData = () => {
      if (blockchain.account !== '' && blockchain.smartContract !== null) {
        dispatch(fetchData())
      }
    }

    const claimNFTs = (mintAmount) => {
      let cost = CONFIG.WEI_COST
      let gasLimit = CONFIG.GAS_LIMIT
      let totalCostWei = String(cost * mintAmount)
      let totalGasLimit = String(gasLimit * mintAmount)
      console.log('Cost: ', totalCostWei)
      console.log('Gas limit: ', totalGasLimit)
      setClaimingStatus('Minting')
      console.log('public mint')
      blockchain.smartContract.methods
        .mint(blockchain.account, mintAmount)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once('error', (err) => {
          console.log(err)
          setClaimingStatus('Begin')
        })
        .then((receipt) => {
          console.log(receipt)
          // setClaimingNft(false);
          setClaimingStatus('Done')
          dispatch(fetchData())
        })
    }

    const [selectedValue, setSelectedValue] = useState(1)

    const handleChange = (e) => {
      setSelectedValue(e.target.value)
    }

    return (
      <div className="section3 background">
        <img
          className="section3-background-image"
          alt="BottomImage"
          src={BottomImage}
        />
        {/* <img
          className="section3-bottom-image"
          alt="BottomImage"
          src={BottomImage2}
        /> */}
        <h2>
          A SUPERNATURAL
          <br />
          NFT TRAVEL
        </h2>
        <h3>BETWEEN</h3>
        <h2 className="mb-5">
          SOUND
          <br />
          AND MUSIC
        </h2>
        {/* {console.log(blockchain.account)}
        {blockchain.account === '' || blockchain.account === null ? (
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              dispatch(connect())
              return false
            }}
          >
            CONNECT
          </a>
        ) : (
          <>
            {claimingStatus === 'Minting' ? (
              <a>MINTING...</a>
            ) : (
              <div>
                <a
                  href="javascript:void(0)"
                  onClick={(e) => {
                    claimNFTs(selectedValue)
                    return false
                  }}
                >
                  MINT NOW
                </a>
                <label>
                  <select onChange={handleChange} defaultValue="1">
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            )}
          </>
        )} */}
        <br />
        <h2>
          Sales are paused, all Friends & Family spots have been claimed.
          <br />
          Comme back for our public launch later this week !
        </h2>
      </div>
    )
  }

  const CommunityGrid = () => {
    return (
      <div className="section4 background">
        <Container className="cp-container">
          <Row className="cp-row">
            <Col className="cp-column">
              <Image src={TheArtist} height={300} />
              <div>
                <h2 className="title">The artist</h2>
                <h2 className="detail">
                  Louis Bekk is a French Music Producer who worked for
                  international singers and rappers. Co-managed by the former
                  president of Epic Record, he’s considered as the upcoming
                  superstar in America
                </h2>
              </div>
            </Col>
            <Col className="cp-column">
              <Image src={Community} height={300} />
              <div>
                <h2 className="title">Community</h2>
                <h2 className="detail">
                  This project is for all the dreamers who see the NFT and
                  Metaverse as an opportunity to live a unique experience where
                  Art is pushed to the next level !
                </h2>
              </div>
            </Col>
          </Row>
          <Row className="cp-row">
            <Col className="cp-column">
              <Image src={AccessPass} height={300} />
              <div>
                <h2 className="title">Access pass</h2>
                <h2 className="detail">
                  Each NFT is a uniquely designed piece of art with a unreleased
                  loop composed by Louis Bekk. It is also a FREE PASS for the
                  First Art Centre in Sandbox.
                </h2>
              </div>
            </Col>
            <Col className="cp-column">
              <Image src={Metaverse} height={300} />
              <div>
                <h2 className="title">Metaverse</h2>
                <h2 className="detail">
                  We strongly believe that the Metaverse will be the new way to
                  experiment Art and Human Interactions. Therefore, we build a
                  unique Art Center on Sandbox composed by:
                  <br />- The First Music Studio
                  <br />- Art Galleries to mint unreleased NFT before everyone
                  <br />- Conference Rooms
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  const GuitarVideo = () => {
    return (
      <video
        id="Image"
        autoPlay
        loop
        muted
        playsInline="true"
        className="guitarVideo"
        src={nft107}
        alt="sample-1"
      />
      // <div className="section5">

      //   <img src={require("./images/burning_guitar.png")} alt="BurningGuitar" />
      // </div>
    )
  }
  const VideoGalleryIntro = () => {
    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)
    const [claimingStatus, setClaimingStatus] = useState('Connect')

    const getData = () => {
      if (blockchain.account !== '' && blockchain.smartContract !== null) {
        dispatch(fetchData())
      }
    }

    const claimNFTs = (mintAmount) => {
      let cost = CONFIG.WEI_COST
      let gasLimit = CONFIG.GAS_LIMIT
      let totalCostWei = String(cost * mintAmount)
      let totalGasLimit = String(gasLimit * mintAmount)
      console.log('Cost: ', totalCostWei)
      console.log('Gas limit: ', totalGasLimit)
      setClaimingStatus('Minting')
      console.log('public mint')
      blockchain.smartContract.methods
        .mint(blockchain.account, mintAmount)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once('error', (err) => {
          console.log(err)
          setClaimingStatus('Begin')
        })
        .then((receipt) => {
          console.log(receipt)
          // setClaimingNft(false);
          setClaimingStatus('Done')
          dispatch(fetchData())
        })
    }
    const [selectedValue, setSelectedValue] = useState(1)

    const handleChange = (e) => {
      setSelectedValue(e.target.value)
    }

    return (
      <div className="section6">
        <h3 className="mb-5">
          IMMERSION INTO THE
          <br />
          170 ART PIECES
        </h3>
        {/* {blockchain.account === '' || blockchain.account === null ? (
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              dispatch(connect())
              return false
            }}
          >
            CONNECT
          </a>
        ) : (
          <>
            {claimingStatus === 'Minting' ? (
              <a>MINTING...</a>
            ) : (
              <div>
                <a
                  href="javascript:void(0)"
                  onClick={(e) => {
                    claimNFTs(selectedValue)
                    return false
                  }}
                >
                  MINT NOW
                </a>
                <label>
                  <select onChange={handleChange} defaultValue="1">
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            )}
          </>
        )} */}
        <br />
        <h2>
          Sales are paused, all Friends & Family spots have been claimed.
          <br />
          Comme back for our public launch later this week !
        </h2>
      </div>
    )
  }

  const VideoGalleryData = [
    {
      src: nft120,
    },
    {
      src: nft171,
    },
    {
      src: nft95,
    },
    {
      src: nftSuper1,
    },
    {
      src: nftSuper4,
    },
  ]

  useEffect(() => {
    // console.log(getSlider,'5888')
    // getSlider[0].setAttribute=('id','slider-item');
    //   var vid = document.getElementById("Image");
    //   vid.addEventListener('loadedmetadata', function () {
    //     var duration = vid.duration;
    //    console.log(duration,'555')
    // });
    var aud = document.getElementById('Image')

    aud.ontimeupdate = function () {
      myFunction()
    }

    function myFunction() {
      console.log(document.getElementById('image-background'))
      if (aud.currentTime > 5.0) {
        var element = document.getElementById('section2')
        element.classList.add('show')
      }
    }
  }, [document.getElementById('Image')])

  const VideoGallery = () => {
    return (
      <div id="slider-item">
        <Slider
          focusOnSelect
          infinite
          arrows
          slidesToShow={1}
          centerMode
          centerPadding={'400px'}
          speed={500}
          prevArrow={
            <button type="button" className="slick-prev">
              <img src={prev} />
            </button>
          }
          nextArrow={
            <button type="button" className="slick-next">
              <img src={Next} />
            </button>
          }
          responsive={[
            {
              breakpoint: 1380,
              settings: {
                centerPadding: '340px',
              },
            },
            {
              breakpoint: 1200,
              settings: {
                centerPadding: '250px',
              },
            },
            {
              breakpoint: 992,
              settings: {
                centerPadding: '200px',
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                centerPadding: '40px',
              },
            },
            {
              breakpoint: 576,
              settings: {
                centerPadding: '40px',
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          afterChange={() => {
            const videos = document.getElementsByClassName('slick-slide')
            Array.prototype.forEach.call(videos, (video) => {
              video.getElementsByTagName('video')[0].pause()
            })
            const videoToPlay = document
              .getElementsByClassName('slick-active slick-center')[0]
              .getElementsByTagName('video')[0]
            videoToPlay.play()
          }}
          className="center section7 background"
        >
          {VideoGalleryData.map((result, index) => {
            return (
              <video
                id={`video${index}`}
                autoPlay={index === 0}
                loop
                muted
                playsInline="true"
                key={index}
                className="shadow1 col-md-4"
                src={result.src}
              />
            )
          })}
          {/* <div className="background" /> */}
        </Slider>
      </div>
    )
  }

  // const GuitarLoader = () => {
  //   return (
  //     <div className="section8 background">
  //       <img
  //         id="BlueGuitar"
  //         className="img"
  //         src={guitarBlue}
  //         alt="BurningGuitar"
  //       />
  //     </div>
  //   )
  // }
  const Concept1 = () => {
    return (
      <div className="section9 background" id="concept">
        <div className="container">
          <div className="row">
            <div className="col-md-7 position-relative">
              <img className="section9-image" src={imgLeft} alt="concept" />
              <img
                className="section9-image-background"
                src={conceptBG}
                alt="ConceptImageBackground"
              />
            </div>
            <div className="col-md-5 ps-md-5">
              <h2 className="title">CONCEPT</h2>
              {/* <h2 className="italic">Louis Bekk:</h2> */}
              <h2 className="detail">
                I teamed up with the graphic designer Augustin Goupy to bring
                you at the deepest of my artistic world with 170 uniquely
                designed visuals and unreleased songs composed by me. Buying one
                of these NFT will give you access to:
                <ul className="ulli_tag">
                  <li>
                    - A secret whitelist for the next collections (3D music
                    instruments playable in the Metaverse)
                  </li>
                  <li>- My Art Center on Sandbox for free</li>
                </ul>
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const Concept2 = () => {
    return (
      <div className="section10 background">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ps-5 re-text">
              <h2 className="title">EXHIBITIONS</h2>
              <h2 className="detail">
                Far from the algorithmically-generated pfp that you will find
                everywhere else, these NFT are exclusive pieces of artistic
                expression exhibited in INTERNATIONAL GALLERIES:
                <ul className="ulli_tag">
                  <li>- Beyond The Heaven” (HOFA, London)</li>
                  <li>- “Beyond The Heaven” (HOFA, Miami)</li>
                  <li>- “Winter Collection” (BEL-AIR Fine Art, Courchevel)</li>
                </ul>
              </h2>
              <div className="sec10_ul_img">
                <img src={Hofa}></img>
                <img src={belairfineart}></img>
              </div>
            </div>
            <div className="col-md-5 position-relative">
              <img
                className="section10-image-background"
                src={conceptBGImage}
                alt="ConceptImageBackground"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RoadMap = () => {
    return (
      <div className="section11 background" id="roadmap">
        <h3 class="mb-5">ROADMAP</h3>
        <Accordion className="container" defaultActiveKey="0">
          {accordianData.map((result, index) => {
            return (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <div>
                    <ul>
                      <li>{result.title1}</li>
                      <li>{result.title2}</li>
                      <li>
                        <img src={accordionIcon} alt="AccordionIcon" />
                      </li>
                    </ul>
                  </div>
                </Accordion.Header>
                <Accordion.Body>{result.data}</Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </div>
    )
  }

  return (
    <div className="App">
      <Provider store={store}>
        <NavBar className="background" />
        <GuitarBanner />
        {/* <AnimImage /> */}
        <SoundAndMusic />
        <CommunityGrid />
        <GuitarVideo />
        <VideoGalleryIntro />
        <VideoGallery />
        {/* <GuitarLoader /> */}
        <Concept1 />
        <Concept2 />
        <RoadMap />
        <Footer />
      </Provider>
    </div>
  )
}

export default App
