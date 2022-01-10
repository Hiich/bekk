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
import nft21 from './videos/Nft-2-1 (1).mp4'
import BottomImage from './images/sec3_bg_img.png'
import BottomImage2 from './images/sec3_bg_img (1).png'
import TheArtist from './images/The-artist.png'
import Community from './images/Community.png'
import AccessPass from './images/Access-pass.png'
import Metaverse from './images/Metaverse.png'
import nft107 from './videos/Nft-107-8 (1).mp4'
import nft11 from './videos/Nft-11-1 (1).mp4'
import nft120 from './videos/Nft-120-21 (1).mp4'
import nft171 from './videos/Nft-171-72 (1).mp4'
import nft95 from './videos/Nft-95-119 (1).mp4'
import nftSuper1 from './videos/Nft-Super-1-Finish-1 (1).mp4'
import nftSuper4 from './videos/Nft-Super-4-Finish-4 (1).mp4'
import guitarBlue from './images/guitar_blue.png'
import imgLeft from './images/img_left.png'
import conceptBG from './images/Concept-BG.png'
import conceptBGImage from './images/section10_bg_img.png'
import accordionIcon from './images/accordion_icon.png'
import saxophone from './images/sexophone.png'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './redux/store'
import blockchainReducer from './redux/blockchain/blockchainReducer'

function App() {
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '0x8991cCdC3b65c34D09590f743fA08c608Cc6E25D ',
    SCAN_LINK: '',
    NETWORK: {
      NAME: 'Ethereum',
      SYMBOL: 'ETH',
      ID: 4,
    },
    NFT_NAME: 'Bekk',
    SYMBOL: 'BK',
    MAX_SUPPLY: 170,
    WEI_COST: 300000000000000000,
    DISPLAY_COST: 0.3,
    GAS_LIMIT: 185000,
    MARKETPLACE: 'Opensea',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  })

  const html = document.documentElement
  const accordianData = [
    {
      title1: 'Step 1',
      title2: 'Minting',
      data:
        'The mint starts on 10th January 2022  18:00 CEST time. Everyone that is whitelisted has a 24-hour window to mint their reserved NFT. The mint price is 0.3 ETH. The reveal will happen once the collection is sold out, after that you will be able to purchase on the secondary market through Opensea.',
    },
    {
      title1: 'Step 2',
      title2: 'Metaverse development',
      data:
        'Signature of long-term partnership with LandVault to finish our Art Center on Sandbox. It will start with a social hub and contests on a specific part of our 3x3 land, before expanding to the rest of the services!',
    },
    {
      title1: 'Step 3',
      title2: 'Partnerships',
      data:
        'We are currently negotiating partnerships with music labels and iconic management companies. Holding one of our NFT will give you EXCLUSIVE access to join superstars virtually in our studio as a « viewer », but also show your talent in front of music insiders in the Metaverse.',
    },
    {
      title1: 'Step 4',
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
      <div className="background">
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
      </div>
    )
  }

  const AnimImage = () => {
    return (
      <div className="background" id="section2">
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
        .mint(blockchain.account, mintAmount, 1)
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
        <img
          className="section3-bottom-image"
          alt="BottomImage"
          src={BottomImage2}
        />
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
        {console.log(blockchain.account)}
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
                    <option>3</option>
                    <option>4</option>
                  </select>
                </label>
              </div>
            )}
          </>
        )}
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
        .mint(blockchain.account, mintAmount, 1)
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
                    <option>3</option>
                    <option>4</option>
                  </select>
                </label>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  const VideoGalleryData = [
    // {
    //   src: nft107,
    // },
    // {
    //   src: nft120,
    // },
    // {
    //   src: nft171,
    // },
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

  const VideoGallery = () => {
    return (
      <Slider
        focusOnSelect
        infinite
        arrows
        slidesToShow={3}
        centerMode
        centerPadding={0}
        speed={500}
        responsive={[
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              adaptiveHeight: true,
            },
          },
          {
            breakpoint: 567,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
        afterChange={() => {
          const videos = document.getElementsByClassName('slick-active')
          Array.prototype.forEach.call(videos, (video) => {
            video.getElementsByTagName('video')[0].pause()
          })
          const videoToPlay = document
            .getElementsByClassName('slick-active slick-center')[0]
            .getElementsByTagName('video')[0]
          videoToPlay.play()
        }}
        className="section7 background"
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
    )
  }

  const GuitarLoader = () => {
    return (
      <div className="section8 background">
        <img
          id="BlueGuitar"
          className="img"
          src={guitarBlue}
          alt="BurningGuitar"
        />
      </div>
    )
  }
  const Concept1 = () => {
    return (
      <div className="section9 background">
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
              <h2 className="italic">Louis Bekk:</h2>
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
              <h2 className="title">GALLERIE'S EXHIBITIONS</h2>
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
      <div className="section11 background">
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
        <AnimImage />
        <SoundAndMusic />
        <CommunityGrid />
        <GuitarVideo />
        <VideoGalleryIntro />
        <VideoGallery />
        <GuitarLoader />
        <Concept1 />
        <Concept2 />

        <div className="section10-sexophone background">
          <img
            className="section10-sexophone-image"
            src={saxophone}
            alt="BurningGuitar"
          />
        </div>
        <RoadMap />
        <Footer />
      </Provider>
    </div>
  )
}

export default App
