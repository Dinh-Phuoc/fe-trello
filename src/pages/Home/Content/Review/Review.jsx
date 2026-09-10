import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useCallback, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import capitalizeFirstLetter from '~/utils/formatter'
import { TITLE_TYPOGRAPHY, DESC_TYPOGRAPHY, DesktopCardPaper, DotIndicator, MobileCardPaper } from './Review.style'

const CARDS = [
    {
        id: 1,
        title: 'inbox',
        desc: "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
        img: 'https://images.ctfassets.net/rz1oowkt5gyp/76s8l9DR2ZxNhjevNpluXZ/cfb2b7555f019f09045ff08b05cf5a4d/inbox-subheader-updated.png'
    },
    {
        id: 2,
        title: 'boards',
        desc: "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
        img: 'https://images.ctfassets.net/rz1oowkt5gyp/60f6L1YQ03iAyOWYJe9ZQP/40da9e6e29cecda15bb92a8ced28a346/TrelloBoard_ProcessTracking_Onboarding_2x.png?w=1936&fm=webp'
    },
    {
        id: 3,
        title: 'planner',
        desc: "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
        img: 'https://images.ctfassets.net/rz1oowkt5gyp/5jLvxYsqWehh4tkm3FqMYj/eec08095626ec26259144e7055dd7d08/planner-hero.png?w=2280&fm=webp'
    }
]

// ── Main component ────────────────────────────────────────────────────────────
export default function Review() {
    const [activeIndex, setActiveIndex] = useState(0)
    const imageSwiperRef = useRef(null)
    const cardSwiperRef = useRef(null)

    const syncTo = useCallback((index) => {
        if (imageSwiperRef.current && imageSwiperRef.current.activeIndex !== index) {
            imageSwiperRef.current.slideTo(index)
        }
        if (cardSwiperRef.current && cardSwiperRef.current.activeIndex !== index) {
            cardSwiperRef.current.slideTo(index)
        }
    }, [])

    const handleSlideChange = useCallback(
        (swiper) => (source) => {
            const index = swiper.activeIndex
            setActiveIndex(index)
            const other = source === 'image' ? cardSwiperRef.current : imageSwiperRef.current
            if (other && other.activeIndex !== index) {
                other.slideTo(index)
            }
        },
        []
    )

    const handleCardClick = useCallback(
        (index) => () => {
            setActiveIndex(index)
            syncTo(index)
        },
        [syncTo]
    )

    return (
        <Container>
            <Box sx={{ m: { xs: '50px 0px', sm: '24px 50px 24px' } }}>
                {/* ── Header ── */}
                <Box sx={{ mb: '24px', width: '100%', p: '18px' }}>
                    <Typography sx={{ mb: '12px' }}>TRELLO 101</Typography>
                    <Typography variant="h4" sx={{ mb: '12px', fontWeight: 500 }}>
                        Your productivity powerhouse
                    </Typography>
                    <Typography sx={{ '&.MuiTypography-root.MuiTypography-body1': { fontSize: '1.2rem' } }}>
                        Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or
                        responsibility—no matter how small—finds its place, keeping you at the top of your game.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignContent: 'center' }}>
                    {/* ── Left: desktop card list ── */}
                    <Box
                        sx={{
                            width: '35%',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            p: '8px'
                        }}
                    >
                        {CARDS.map((card, index) => (
                            <DesktopCardPaper
                                key={card.id}
                                onClick={handleCardClick(index)}
                                $isActive={activeIndex === index}
                                elevation={activeIndex === index ? 4 : 0}
                            >
                                <Typography sx={TITLE_TYPOGRAPHY}>{capitalizeFirstLetter(card.title)}</Typography>
                                <Typography sx={DESC_TYPOGRAPHY}>{card.desc}</Typography>
                            </DesktopCardPaper>
                        ))}
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}
                        >
                            {CARDS.map((card, index) => (
                                <DotIndicator key={card.id} $isActive={activeIndex === index} />
                            ))}
                        </Box>

                        <Box sx={{ mt: '24px', overflow: 'hidden', width: '100%' }}>
                            <Swiper
                                onSwiper={(swiper) => {
                                    imageSwiperRef.current = swiper
                                }}
                                onSlideChange={(swiper) => handleSlideChange(swiper)('image')}
                                slidesPerView={1}
                                grabCursor
                                style={{ width: '100%' }}
                            >
                                {CARDS.map((card) => (
                                    <SwiperSlide key={card.id}>
                                        <Box sx={{ width: '100%' }}>
                                            <img
                                                style={{ userSelect: 'none', width: '100%', objectFit: 'contain' }}
                                                src={card.img}
                                                alt={card.title}
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>

                        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: '24px', width: '100%' }}>
                            <Swiper
                                onSwiper={(swiper) => {
                                    cardSwiperRef.current = swiper
                                }}
                                onSlideChange={(swiper) => handleSlideChange(swiper)('card')}
                                slidesPerView={1}
                                grabCursor
                            >
                                {CARDS.map((card, index) => (
                                    <SwiperSlide key={card.id}>
                                        <MobileCardPaper
                                            $isActive={activeIndex === index}
                                            elevation={activeIndex === index ? 4 : 0}
                                        >
                                            <Typography sx={TITLE_TYPOGRAPHY}>
                                                {capitalizeFirstLetter(card.title)}
                                            </Typography>
                                            <Typography sx={DESC_TYPOGRAPHY}>{card.desc}</Typography>
                                        </MobileCardPaper>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                justifyContent: 'center',
                                flexDirection: 'row',
                                mt: '24px'
                            }}
                        >
                            {CARDS.map((card, index) => (
                                <DotIndicator key={card.id} $isActive={activeIndex === index} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
