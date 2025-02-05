import React from 'react';
import CatFilmImage from '../assets/Catfilm.png';

const AboutUs = () => {
  return (
    //main component container
    <div style={{
      backgroundColor: 'white',
      fontFamily: "'Itim', cursive",
      //centers content verticall & horizontally
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 80px)",
      width: "100vw",
    }}>
      <div style={{
      //content wrapper
        //two-column layout
        display: "flex",
        alignItems: "center",
        //even space between columns
        justifyContent: "space-between",
        //width of two columns is 80 percent of the screen
        width: "80%",
        maxWidth: "1200px",
      }}>
        {/* Left content section */}
        <div style={{
          //takes up whole space
          flex: '1',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#000',
            textAlign: 'left'
          }}>
            {/* left side text header */}
            WHO ARE WE
          </h1>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'left'
            }}>
              Bridging the past and present, we bring the classic photobooth experience into the 
              digital age—no bulky setups, just your device's camera.
            </p>

            <p style={{
              fontSize: '20px',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'left'
            }}>
              With photobooths rising in popularity, we're making them more accessible than ever.
            </p>

            <p style={{
              fontSize: '20px',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'left'
            }}>
              Whether you're a small business looking to attract customers or someone without a 
              photobooth nearby, our platform lets you capture the fun anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Right image section */}
        <div style={{
          width: '400px',
          height: '450px',
          border: '1px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}>
          <img 
          //placeholder image until we have an example of us
            src={CatFilmImage} 
            alt="Cat Film Frame"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
