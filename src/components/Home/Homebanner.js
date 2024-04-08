import React from 'react'
import Footer from '../Footer'

export default function Homebanner() {

    const bannerarr = [
        { url: "./home_images/BSB_CTMAHI_F_0504.jpg" },
        { url: "./home_images/BSB_CTUPI_F_2603.webp" },
        { url: "./home_images/BSB_dubai_packages_1912_1.webp" },
        { url: "./home_images/BSB_exploreall_Packages_1912_1.webp" },
        { url: "./home_images/bsb_ONECARD_F_2403.webp" },
        { url: "./home_images/BSB_srilanka_packages_1912_1.webp" },
      ]


  return (
    <div className="banner-container flex">
        <div className="homebanner-list">
          {bannerarr.map((item, index) => (
            <img className="homebanner-img c" src={item.url} />
          ))}
        </div>
        <img style={{ width: '67vw' }} src="./home_images/qrCode_7.webp" />
        <Footer />
      </div>
  )
}
