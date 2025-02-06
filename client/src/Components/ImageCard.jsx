import React from 'react'

const ImageCard = ({imageSource, text}) => {
    return (
        <div class="card mb-3" style={{maxWidth: "70%"}}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={imageSource} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <p class="card-text">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
