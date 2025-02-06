import React from 'react'
import './styles.css'

const Carousel = () => {
    return (
        <div>
            <div id="carouselExampleFade" class="carousel slide carousel-fade">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://media.licdn.com/dms/image/D5612AQH5A6XKSTLy4w/article-cover_image-shrink_600_2000/0/1706674818278?e=2147483647&v=beta&t=JDl67rup6VsNqNsaWu5whXrjCi6prqhYxP4Mvk4-d5M" class="d-block w-100" alt='my-img'/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn.prod.website-files.com/62c67956409fa136e375e7b7/66e334ffeb46adcb5c01230c_Blog-Post-what-is-equity-crowdfunding-T.jpg" class="d-block w-100" alt='my-img'/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.squarespace-cdn.com/content/v1/639b5b2c4098ba4df6e6dc92/70e4fec3-8121-4cdf-8c6e-5e74782f6fa8/Crowdfunding%2BYour%2BSmall%2BBusiness%2B-%2BWhat%2BYou%2BNeed%2Bto%2BKnow.jpg" class="d-block w-100" alt='my-img'/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
