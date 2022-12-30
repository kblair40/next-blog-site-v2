import React, { useEffect, useRef } from "react";
import { Icon } from "@chakra-ui/react";

const NeverMissAPost = () => {
  const ref = useRef();
  const paths = useRef();

  useEffect(() => {
    if (!ref.current) return;
    paths.current = ref.current.children;

    animateIn();
  }, []);

  const animateIn = async () => {
    for (let i = 0; i < paths.current.length; i++) {
      let path = paths.current[i];
      await timer(300);
      path.classList.add("write-logo");
      console.log("DONE", i);
    }
  };

  const timer = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  const defaultPathStyle = {
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    strokeWidth: "1px",
    stroke: "black",
    fill: "black",
    fillOpacity: 0,
  };

  return (
    <Icon
      // strokeDashArray={1000}
      // strokeDashoffset={1000}
      // className="write-text"
      ref={ref}
      width="339"
      height="45"
      viewBox="0 0 339 45"
      pointerEvents="none"
      fill="none"
    >
      <path
        d="M41.3281 2.94395C42.2561 2.17595 43.3121 1.79195 44.4961 1.79195C45.6801 1.79195 46.2721 2.03195 46.2721 2.51195C46.2721 2.70395 46.1281 2.99195 45.8401 3.37595C45.5841 3.95195 44.3841 6.12795 42.2401 9.90395C36.6401 19.696 33.8401 26.224 33.8401 29.488C33.8401 29.744 33.9041 29.872 34.0321 29.872C34.2241 29.872 34.5441 29.552 34.9921 28.912C36.3041 26.64 37.9841 24.032 40.0321 21.088C42.0801 18.144 44.0161 15.552 45.8401 13.312C47.6641 11.072 49.7281 8.97595 52.0321 7.02395C54.3361 5.07195 56.4321 3.85595 58.3201 3.37595C61.4561 2.86395 63.4881 2.60795 64.4161 2.60795C64.5121 2.63995 64.5601 2.71995 64.5601 2.84795C64.5601 2.94395 64.3841 3.08795 64.0321 3.27995C60.4161 5.29595 55.9201 9.13595 50.5441 14.8C45.2001 20.432 40.3681 26.224 36.0481 32.176C34.8961 34.128 34.0001 35.344 33.3601 35.824C32.7201 36.304 31.9521 36.544 31.0561 36.544C29.3921 36.544 28.5601 34.784 28.5601 31.264C28.5601 29.728 28.8641 28.16 29.4721 26.56C31.7121 20.576 33.8081 16.288 35.7601 13.696C36.8481 12.096 37.3921 11.216 37.3921 11.056C37.3921 10.96 37.2001 11.152 36.8161 11.632C28.8481 21.648 23.2161 28.208 19.9201 31.312C17.6481 33.68 15.0721 36.112 12.1921 38.608C9.3121 41.104 7.0081 42.816 5.2801 43.744C4.7361 44.192 4.1601 44.416 3.55209 44.416C2.9441 44.416 2.2081 44.16 1.3441 43.648C0.480096 43.136 0.0480957 42.544 0.0480957 41.872C0.0480957 41.52 0.240096 41.2 0.624095 40.912L8.4961 34.288C8.9761 33.872 9.2801 33.664 9.4081 33.664C9.5041 33.664 9.5521 33.728 9.5521 33.856C9.5521 33.952 9.5041 34.096 9.4081 34.288C9.3121 34.48 9.1681 34.688 8.9761 34.912C8.7521 35.136 8.5281 35.344 8.3041 35.536L7.4881 36.4C6.4961 37.392 6.0001 37.936 6.0001 38.032C6.0001 38.16 6.0321 38.224 6.0961 38.224C6.1601 38.224 6.3201 38.128 6.5761 37.936C9.6481 35.824 14.0801 31.856 19.8721 26.032C25.6641 20.176 30.6881 14.864 34.9441 10.096L41.3281 2.94395Z"
        {...defaultPathStyle}
      />
      <path
        d="M57.0207 19.504C56.1887 19.504 54.7807 20.368 52.7967 22.096C50.8127 23.792 49.8207 24.832 49.8207 25.216C49.8207 25.28 49.8687 25.312 49.9647 25.312C50.6687 25.312 52.0607 24.528 54.1407 22.96C56.2527 21.392 57.3087 20.32 57.3087 19.744C57.3087 19.584 57.2127 19.504 57.0207 19.504ZM46.7967 34.864C44.3327 34.864 43.1007 33.36 43.1007 30.352C43.1007 28.464 43.9167 26.464 45.5487 24.352C47.2127 22.208 49.1647 20.464 51.4047 19.12C53.6447 17.744 55.6287 17.056 57.3567 17.056C58.1247 17.056 58.8287 17.36 59.4687 17.968C60.1407 18.576 60.4767 19.168 60.4767 19.744C60.4767 20.8 59.7247 22 58.2207 23.344C56.7167 24.656 55.1327 25.728 53.4687 26.56C51.8367 27.36 50.7487 27.76 50.2047 27.76C49.6927 27.76 49.3087 27.52 49.0527 27.04C48.9247 26.944 48.7487 26.896 48.5247 26.896C48.3007 26.896 47.9327 27.328 47.4207 28.192C46.9087 29.024 46.6527 29.712 46.6527 30.256C46.6527 30.768 46.8447 31.088 47.2287 31.216C49.6607 31.216 52.3007 30.512 55.1487 29.104C57.9967 27.664 61.9327 25.152 66.9567 21.568C67.3087 21.312 67.8367 20.928 68.5407 20.416C69.2767 19.904 69.7087 19.6 69.8367 19.504C70.1247 19.728 70.2687 20 70.2687 20.32C70.2687 20.64 70.1247 20.928 69.8367 21.184C68.2367 22.784 66.1567 24.576 63.5967 26.56C61.0687 28.544 58.1567 30.432 54.8607 32.224C51.5647 33.984 48.8767 34.864 46.7967 34.864Z"
        {...defaultPathStyle}
      />
      <path
        d="M67.5931 19.312C68.2331 18.544 68.7291 18.16 69.0811 18.16C69.4331 18.16 69.8651 18.256 70.3771 18.448C70.8891 18.608 71.1451 18.864 71.1451 19.216C71.1451 19.536 70.9851 19.856 70.6651 20.176C67.3371 23.632 64.9211 26.752 63.4171 29.536C63.1291 30.144 62.9851 30.592 62.9851 30.88C62.9851 31.168 63.0651 31.312 63.2251 31.312C63.8331 31.312 65.1451 30.432 67.1611 28.672C69.2091 26.912 71.2091 24.784 73.1611 22.288C75.1451 19.76 76.2171 17.648 76.3771 15.952C76.3771 15.408 76.4571 15.136 76.6171 15.136C76.7131 15.136 76.8251 15.264 76.9531 15.52C77.6571 16.672 78.0091 17.696 78.0091 18.592C78.0091 20.288 76.9371 22.448 74.7931 25.072C72.6491 27.696 70.2171 29.984 67.4971 31.936C64.8091 33.856 62.6491 34.816 61.0171 34.816C59.4171 34.816 58.6171 34.016 58.6171 32.416C58.6171 31.648 58.9371 30.672 59.5771 29.488C60.1851 28.272 60.9211 27.088 61.7851 25.936C63.5771 23.6 65.1931 21.712 66.6331 20.272L67.5931 19.312Z"
        {...defaultPathStyle}
      />
      <path
        d="M88.427 19.504C87.595 19.504 86.187 20.368 84.203 22.096C82.219 23.792 81.227 24.832 81.227 25.216C81.227 25.28 81.275 25.312 81.371 25.312C82.075 25.312 83.467 24.528 85.547 22.96C87.659 21.392 88.715 20.32 88.715 19.744C88.715 19.584 88.619 19.504 88.427 19.504ZM78.203 34.864C75.739 34.864 74.507 33.36 74.507 30.352C74.507 28.464 75.323 26.464 76.955 24.352C78.619 22.208 80.571 20.464 82.811 19.12C85.051 17.744 87.035 17.056 88.763 17.056C89.531 17.056 90.235 17.36 90.875 17.968C91.547 18.576 91.883 19.168 91.883 19.744C91.883 20.8 91.131 22 89.627 23.344C88.123 24.656 86.539 25.728 84.875 26.56C83.243 27.36 82.155 27.76 81.611 27.76C81.099 27.76 80.715 27.52 80.459 27.04C80.331 26.944 80.155 26.896 79.931 26.896C79.707 26.896 79.339 27.328 78.827 28.192C78.315 29.024 78.059 29.712 78.059 30.256C78.059 30.768 78.251 31.088 78.635 31.216C81.067 31.216 83.707 30.512 86.555 29.104C89.403 27.664 93.339 25.152 98.363 21.568C98.715 21.312 99.243 20.928 99.947 20.416C100.683 19.904 101.115 19.6 101.243 19.504C101.531 19.728 101.675 20 101.675 20.32C101.675 20.64 101.531 20.928 101.243 21.184C99.643 22.784 97.563 24.576 95.003 26.56C92.475 28.544 89.563 30.432 86.267 32.224C82.971 33.984 80.283 34.864 78.203 34.864Z"
        {...defaultPathStyle}
      />
      <path
        d="M93.2292 25.024C94.9892 23.808 96.8292 22.496 98.7492 21.088C97.7252 20.384 97.0692 19.696 96.7812 19.024C96.6852 18.8 96.6372 18.64 96.6372 18.544C96.6372 17.904 96.8452 17.488 97.2612 17.296C97.6772 17.072 98.3492 16.96 99.2772 16.96C99.6292 16.96 100.669 17.392 102.397 18.256C104.125 19.12 105.213 19.552 105.661 19.552C106.141 19.552 106.797 19.424 107.629 19.168C108.461 18.88 109.117 18.736 109.597 18.736C110.109 18.736 110.477 18.848 110.701 19.072C111.501 20.128 111.901 20.768 111.901 20.992C111.901 21.216 111.789 21.408 111.565 21.568C111.373 21.696 110.717 22.144 109.597 22.912C108.509 23.68 107.437 24.464 106.381 25.264C105.325 26.064 104.333 26.96 103.405 27.952C102.477 28.944 102.013 29.744 102.013 30.352C102.013 30.448 102.093 30.496 102.253 30.496C103.981 30.496 109.805 26.992 119.725 19.984C119.949 19.984 120.061 20.192 120.061 20.608C120.061 20.992 118.797 22.368 116.269 24.736C113.741 27.072 110.877 29.376 107.677 31.648C104.509 33.888 102.205 35.008 100.765 35.008C98.5252 35.008 97.4052 33.888 97.4052 31.648C97.4052 30.432 97.8052 29.264 98.6052 28.144C99.4372 26.992 101.165 25.456 103.789 23.536C103.245 23.536 102.509 23.408 101.581 23.152C100.653 22.864 100.061 22.528 99.8052 22.144C98.9732 22.88 97.5332 24.112 95.4852 25.84C95.0052 26.192 94.3812 26.368 93.6132 26.368C92.8452 26.368 92.4612 26.256 92.4612 26.032C92.4612 25.776 92.7172 25.44 93.2292 25.024Z"
        {...defaultPathStyle}
      />
      <path
        d="M167.007 2.84795L167.679 3.03995C167.903 3.03995 168.175 2.87995 168.495 2.55995C168.815 2.20795 169.087 2.03195 169.311 2.03195C169.567 2.03195 169.919 2.17595 170.367 2.46395C170.815 2.71995 171.039 2.95995 171.039 3.18395C171.039 3.69595 169.871 5.37595 167.535 8.22395C165.199 11.04 162.639 14.064 159.855 17.296C157.071 20.528 154.511 23.792 152.175 27.088C149.839 30.352 148.671 32.624 148.671 33.904C148.671 36.08 148.831 37.744 149.151 38.896L149.295 39.376C149.295 39.6 149.023 39.712 148.479 39.712C147.935 39.712 147.503 39.664 147.183 39.568C146.895 39.504 146.543 39.344 146.127 39.088C145.359 38.576 144.815 37.216 144.495 35.008C144.495 33.952 144.591 32.976 144.783 32.08C144.975 31.152 145.423 30.048 146.127 28.768C146.863 27.488 147.567 26.336 148.239 25.312C148.943 24.288 150.159 22.736 151.887 20.656C154.159 17.936 156.703 15.008 159.519 11.872C162.335 8.70395 163.871 6.97595 164.127 6.68795C164.415 6.36795 164.559 6.17595 164.559 6.11195C164.559 6.04795 163.647 6.83195 161.823 8.46395C160.031 10.064 156.911 12.944 152.463 17.104C148.047 21.264 145.311 23.968 144.255 25.216C140.063 30.016 137.487 33.136 136.527 34.576C136.367 34.992 136.079 35.2 135.663 35.2C135.279 35.2 134.927 34.928 134.607 34.384C134.063 33.456 133.791 32.288 133.791 30.88C134.431 28.544 135.679 25.6 137.535 22.048C139.391 18.464 141.455 14.944 143.727 11.488L145.983 8.55995C146.207 8.20795 146.319 7.98395 146.319 7.88795L146.271 7.83995C146.239 7.83995 145.007 9.15195 142.575 11.776C140.143 14.4 138.703 15.968 138.255 16.48L127.983 27.712C123.919 32.16 120.991 34.848 119.199 35.776C116.095 36.8 114.223 37.376 113.583 37.504C113.231 37.504 113.055 37.44 113.055 37.312C113.055 37.184 113.215 36.976 113.535 36.688C118.207 31.92 121.135 28.96 122.319 27.808C122.575 27.648 124.671 25.648 128.607 21.808C132.543 17.936 136.751 13.936 141.231 9.80795C145.743 5.67995 148.943 3.10395 150.831 2.07995C152.079 1.69595 153.007 1.50395 153.615 1.50395C154.255 1.50395 154.575 1.67995 154.575 2.03195C154.575 2.25595 154.431 2.51195 154.143 2.79995C149.311 9.71195 146.479 14.08 145.647 15.904L142.719 21.424C142.623 21.648 142.575 21.808 142.575 21.904C142.575 22.096 142.607 22.16 142.671 22.096C145.199 20.048 148.511 17.168 152.607 13.456C156.735 9.74395 159.887 7.05595 162.063 5.39195C164.239 3.69595 165.887 2.84795 167.007 2.84795Z"
        {...defaultPathStyle}
      />
      <path
        d="M172.239 10.24C172.559 10.24 172.767 10.304 172.863 10.432C173.311 10.976 173.535 11.424 173.535 11.776C173.535 12.096 173.439 12.384 173.247 12.64C173.055 12.864 172.815 13.136 172.527 13.456C172.271 13.744 171.727 14.16 170.895 14.704C170.095 15.216 169.311 15.472 168.543 15.472C167.967 15.376 167.679 15.024 167.679 14.416C167.679 13.456 168.255 12.528 169.407 11.632C170.559 10.704 171.503 10.24 172.239 10.24ZM160.719 29.152C160.463 29.6 160.335 30 160.335 30.352C160.335 30.704 160.527 30.88 160.911 30.88C161.135 30.88 161.519 30.784 162.063 30.592C168.047 27.456 173.903 23.76 179.631 19.504C179.919 19.728 180.063 20 180.063 20.32C180.063 20.64 179.903 20.944 179.583 21.232C179.263 21.52 178.799 21.936 178.191 22.48C177.615 23.024 176.495 24 174.831 25.408C173.167 26.816 171.615 28.096 170.175 29.248C166.399 32.288 163.615 34.08 161.823 34.624C161.247 34.784 160.623 34.864 159.951 34.864C157.487 34.864 156.255 33.552 156.255 30.928C156.255 29.904 156.815 28.448 157.935 26.56C159.055 24.64 160.207 22.96 161.391 21.52C162.575 20.048 163.359 19.232 163.743 19.072C164.319 18.72 164.943 18.544 165.615 18.544C166.287 18.544 166.927 18.672 167.535 18.928C167.727 19.024 167.823 19.152 167.823 19.312C167.823 19.472 167.663 19.712 167.343 20.032C167.055 20.352 166.591 20.848 165.951 21.52C165.343 22.192 164.415 23.36 163.167 25.024C161.951 26.656 161.135 28.032 160.719 29.152Z"
        {...defaultPathStyle}
      />
      <path
        d="M175.867 30.496C176.987 30.496 178.011 29.824 178.939 28.48C179.899 27.104 180.571 25.728 180.955 24.352C181.339 22.944 181.531 21.824 181.531 20.992C181.531 20.768 181.355 20.656 181.003 20.656C180.683 20.656 180.299 20.832 179.851 21.184L173.563 26.032C173.115 26.288 172.603 26.416 172.027 26.416C171.451 26.416 171.163 26.208 171.163 25.792C171.163 25.504 171.195 25.312 171.259 25.216C171.355 25.12 171.595 24.96 171.979 24.736C174.347 23.104 177.579 20.448 181.675 16.768C182.155 16.128 182.587 15.808 182.971 15.808C183.355 15.808 183.995 15.936 184.891 16.192C185.787 16.416 186.235 16.688 186.235 17.008C186.235 18.928 186.059 20.672 185.707 22.24C185.355 23.808 184.987 25.008 184.603 25.84C184.251 26.64 184.075 27.072 184.075 27.136C184.075 27.2 184.107 27.232 184.171 27.232C184.235 27.232 184.363 27.184 184.555 27.088C186.955 25.872 190.011 23.888 193.723 21.136L194.875 20.272C195.163 20.496 195.307 20.768 195.307 21.088C195.307 21.408 195.163 21.696 194.875 21.952C194.811 21.952 193.979 22.624 192.379 23.968C190.811 25.312 189.051 26.784 187.099 28.384C185.179 29.952 183.115 31.392 180.907 32.704C178.699 34.016 176.987 34.672 175.771 34.672C172.763 34.672 171.259 32.864 171.259 29.248C171.259 28.96 171.371 28.704 171.595 28.48C171.851 28.224 172.171 28.096 172.555 28.096C172.555 28.256 172.635 28.512 172.795 28.864C172.987 29.184 173.179 29.456 173.371 29.68C173.947 30.224 174.779 30.496 175.867 30.496Z"
        {...defaultPathStyle}
      />
      <path
        d="M192.461 30.496C193.581 30.496 194.605 29.824 195.533 28.48C196.493 27.104 197.165 25.728 197.549 24.352C197.933 22.944 198.125 21.824 198.125 20.992C198.125 20.768 197.949 20.656 197.597 20.656C197.277 20.656 196.893 20.832 196.445 21.184L190.157 26.032C189.709 26.288 189.197 26.416 188.621 26.416C188.045 26.416 187.757 26.208 187.757 25.792C187.757 25.504 187.789 25.312 187.853 25.216C187.949 25.12 188.189 24.96 188.573 24.736C190.941 23.104 194.173 20.448 198.269 16.768C198.749 16.128 199.181 15.808 199.565 15.808C199.949 15.808 200.589 15.936 201.485 16.192C202.381 16.416 202.829 16.688 202.829 17.008C202.829 18.928 202.653 20.672 202.301 22.24C201.949 23.808 201.581 25.008 201.197 25.84C200.845 26.64 200.669 27.072 200.669 27.136C200.669 27.2 200.701 27.232 200.765 27.232C200.829 27.232 200.957 27.184 201.149 27.088C203.549 25.872 206.605 23.888 210.317 21.136L211.469 20.272C211.757 20.496 211.901 20.768 211.901 21.088C211.901 21.408 211.757 21.696 211.469 21.952C211.405 21.952 210.573 22.624 208.973 23.968C207.405 25.312 205.645 26.784 203.693 28.384C201.773 29.952 199.709 31.392 197.501 32.704C195.293 34.016 193.581 34.672 192.365 34.672C189.357 34.672 187.853 32.864 187.853 29.248C187.853 28.96 187.965 28.704 188.189 28.48C188.445 28.224 188.765 28.096 189.149 28.096C189.149 28.256 189.229 28.512 189.389 28.864C189.581 29.184 189.773 29.456 189.965 29.68C190.541 30.224 191.373 30.496 192.461 30.496Z"
        {...defaultPathStyle}
      />
      <path
        d="M224.028 31.984L224.412 28.912C224.412 28.816 224.38 28.768 224.316 28.768C224.284 28.768 224.204 28.832 224.076 28.96C223.66 29.408 223.132 29.968 222.492 30.64C221.852 31.28 220.748 32.16 219.18 33.28C217.644 34.368 216.396 34.912 215.436 34.912C215.276 34.88 215.084 34.816 214.86 34.72C214.604 34.656 214.284 34.4 213.9 33.952C213.516 33.504 213.324 32.864 213.324 32.032C213.324 31.2 213.964 29.936 215.244 28.24C216.492 26.512 217.996 24.832 219.756 23.2C221.516 21.536 223.468 20.096 225.612 18.88C227.788 17.664 229.676 17.056 231.276 17.056C231.884 17.088 232.364 17.52 232.716 18.352C233.036 18.032 233.324 17.872 233.58 17.872C233.836 17.872 234.14 18.064 234.492 18.448C234.684 18.48 234.876 18.592 235.068 18.784C235.26 18.944 235.356 19.184 235.356 19.504C235.356 19.824 235.132 20.176 234.684 20.56C234.012 21.392 233.228 22.336 232.332 23.392C231.436 24.448 230.796 25.216 230.412 25.696C230.028 26.144 229.628 26.656 229.212 27.232C228.508 28.224 228.124 29.024 228.06 29.632C231.324 28.064 236.46 24.688 243.468 19.504C243.756 19.728 243.9 20 243.9 20.32C243.9 20.64 243.772 20.912 243.516 21.136C243.26 21.36 242.94 21.632 242.556 21.952C242.204 22.272 241.484 22.896 240.396 23.824C239.308 24.752 238.252 25.648 237.228 26.512C236.236 27.344 235.084 28.288 233.772 29.344C232.492 30.368 231.34 31.248 230.316 31.984C227.852 33.744 226.316 34.624 225.708 34.624C225.1 34.624 224.668 34.432 224.412 34.048C224.156 33.664 224.028 32.976 224.028 31.984ZM219.132 29.968C219.516 29.968 220.684 29.184 222.636 27.616C224.62 26.048 226.492 24.48 228.252 22.912L230.94 20.56C231.068 20.432 231.132 20.352 231.132 20.32C231.132 20.256 231.084 20.224 230.988 20.224C229.772 20.224 228.188 20.928 226.236 22.336C224.284 23.712 222.588 25.184 221.148 26.752C219.74 28.288 219.036 29.328 219.036 29.872C219.036 29.936 219.068 29.968 219.132 29.968Z"
        {...defaultPathStyle}
      />
      <path
        d="M279.02 3.27995C280.396 4.04795 281.516 5.08795 282.38 6.39995C283.276 7.71195 283.724 9.18395 283.724 10.816C283.724 12.448 282.7 14.32 280.652 16.432C278.604 18.544 276.108 20.352 273.164 21.856C270.252 23.328 267.708 24.064 265.532 24.064C263.388 24.064 261.836 23.168 260.876 21.376C255.372 28.768 252.268 33.248 251.564 34.816C251.596 34.976 251.612 35.2 251.612 35.488C251.612 35.808 251.436 35.968 251.084 35.968C250.732 35.968 250.268 35.664 249.692 35.056C249.148 34.48 248.876 33.648 248.876 32.56C248.876 32.24 248.892 31.984 248.924 31.792C249.212 29.68 252.14 25.52 257.708 19.312C263.308 13.104 267.34 9.32795 269.804 7.98395C270.316 7.72795 270.7 7.59995 270.956 7.59995C271.212 7.59995 271.468 7.67995 271.724 7.83995C272.012 7.99995 272.156 8.19195 272.156 8.41595C272.156 8.63995 272.092 8.81595 271.964 8.94395C269.564 11.44 268.124 12.96 267.644 13.504L261.932 20.128C261.868 20.224 261.836 20.32 261.836 20.416C261.836 20.64 261.98 20.752 262.268 20.752C263.548 20.752 265.276 20.384 267.452 19.648C269.66 18.912 271.836 18 273.98 16.912C276.124 15.792 277.98 14.496 279.548 13.024C281.116 11.52 281.9 10.128 281.9 8.84795C281.9 7.79195 280.892 7.00795 278.876 6.49595C276.86 5.98395 274.684 5.72795 272.348 5.72795C270.044 5.72795 267.548 6.06395 264.86 6.73595C262.172 7.37595 259.82 8.17595 257.804 9.13595C255.82 10.096 254.028 11.104 252.428 12.16C250.828 13.184 249.612 14.096 248.78 14.896C247.98 15.664 247.58 16.176 247.58 16.432C247.58 16.656 247.692 16.768 247.916 16.768C248.14 16.768 248.748 16.608 249.74 16.288C252.94 15.232 256.076 13.808 259.148 12.016C259.372 11.888 259.516 11.824 259.58 11.824C259.676 11.824 259.724 11.872 259.724 11.968C259.724 12.032 259.516 12.336 259.1 12.88C258.716 13.392 258.172 14.032 257.468 14.8C256.764 15.536 255.996 16.256 255.164 16.96C254.332 17.664 253.388 18.272 252.332 18.784C251.308 19.264 250.3 19.504 249.308 19.504C248.348 19.504 247.388 19.12 246.428 18.352C245.5 17.552 245.036 16.48 245.036 15.136C245.036 13.76 245.708 12.272 247.052 10.672C248.396 9.07195 250.156 7.55195 252.332 6.11195C254.54 4.67195 257.276 3.45595 260.54 2.46395C263.804 1.47195 266.988 0.975952 270.092 0.975952C273.196 0.975952 276.172 1.74395 279.02 3.27995Z"
        {...defaultPathStyle}
      />
      <path
        d="M276.674 31.888C277.698 31.888 278.962 31.216 280.466 29.872C281.97 28.528 282.754 27.6 282.818 27.088C282.434 26.768 282.018 26.192 281.57 25.36C281.154 24.496 280.93 24.064 280.898 24.064C279.906 24.992 279.026 26.064 278.258 27.28C277.042 29.328 276.434 30.736 276.434 31.504C276.434 31.76 276.514 31.888 276.674 31.888ZM287.042 20.128C286.722 20.128 286.05 20.624 285.026 21.616C284.034 22.608 283.538 23.296 283.538 23.68C283.538 23.776 283.634 23.968 283.826 24.256C284.018 24.544 284.162 24.688 284.258 24.688C284.802 24.688 285.41 24.032 286.082 22.72C286.786 21.408 287.138 20.656 287.138 20.464C287.138 20.24 287.106 20.128 287.042 20.128ZM287.138 26.32C288.034 26.32 289.426 25.776 291.314 24.688C293.234 23.6 294.914 22.512 296.354 21.424L298.514 19.744C298.802 19.968 298.946 20.24 298.946 20.56C298.946 20.88 298.802 21.168 298.514 21.424C293.234 26.32 289.234 28.768 286.514 28.768C286.322 28.768 286.034 28.736 285.65 28.672C282.034 32.864 278.93 34.96 276.338 34.96C274.61 34.704 273.522 34.096 273.074 33.136C272.818 32.656 272.69 32.048 272.69 31.312C272.69 29.2 273.906 26.688 276.338 23.776C278.77 20.832 281.826 18.672 285.506 17.296C285.826 17.296 286.066 17.376 286.226 17.536C286.386 17.664 286.53 17.744 286.658 17.776C286.786 17.776 286.946 17.712 287.138 17.584C287.362 17.424 287.65 17.344 288.002 17.344C288.354 17.312 288.722 17.504 289.106 17.92C289.618 18.336 289.874 18.848 289.874 19.456C289.874 21.248 288.962 23.536 287.138 26.32Z"
        {...defaultPathStyle}
      />
      <path
        d="M295.352 30.496C296.472 30.496 297.496 29.824 298.424 28.48C299.384 27.104 300.056 25.728 300.44 24.352C300.824 22.944 301.016 21.824 301.016 20.992C301.016 20.768 300.84 20.656 300.488 20.656C300.168 20.656 299.784 20.832 299.336 21.184L293.048 26.032C292.6 26.288 292.088 26.416 291.512 26.416C290.936 26.416 290.648 26.208 290.648 25.792C290.648 25.504 290.68 25.312 290.744 25.216C290.84 25.12 291.08 24.96 291.464 24.736C293.832 23.104 297.064 20.448 301.16 16.768C301.64 16.128 302.072 15.808 302.456 15.808C302.84 15.808 303.48 15.936 304.376 16.192C305.272 16.416 305.72 16.688 305.72 17.008C305.72 18.928 305.544 20.672 305.192 22.24C304.84 23.808 304.472 25.008 304.088 25.84C303.736 26.64 303.56 27.072 303.56 27.136C303.56 27.2 303.592 27.232 303.656 27.232C303.72 27.232 303.848 27.184 304.04 27.088C306.44 25.872 309.496 23.888 313.208 21.136L314.36 20.272C314.648 20.496 314.792 20.768 314.792 21.088C314.792 21.408 314.648 21.696 314.36 21.952C314.296 21.952 313.464 22.624 311.864 23.968C310.296 25.312 308.536 26.784 306.584 28.384C304.664 29.952 302.6 31.392 300.392 32.704C298.184 34.016 296.472 34.672 295.256 34.672C292.248 34.672 290.744 32.864 290.744 29.248C290.744 28.96 290.856 28.704 291.08 28.48C291.336 28.224 291.656 28.096 292.04 28.096C292.04 28.256 292.12 28.512 292.28 28.864C292.472 29.184 292.664 29.456 292.856 29.68C293.432 30.224 294.264 30.496 295.352 30.496Z"
        {...defaultPathStyle}
      />
      <path
        d="M328.407 11.824L330.855 11.776C334.023 11.776 336.327 12.224 337.767 13.12C338.471 13.344 338.823 13.632 338.823 13.984C338.823 14.24 338.503 14.416 337.863 14.512C337.255 14.608 335.095 14.864 331.383 15.28C327.703 15.664 325.175 15.888 323.799 15.952C323.191 15.984 321.783 17.04 319.575 19.12C317.399 21.2 315.319 23.488 313.335 25.984C311.351 28.48 310.359 30.224 310.359 31.216C310.359 31.376 310.439 31.52 310.599 31.648C310.759 31.744 310.951 31.792 311.175 31.792C311.431 31.792 311.815 31.696 312.327 31.504C318.407 27.92 324.311 24 330.039 19.744C330.327 19.968 330.471 20.24 330.471 20.56C330.471 20.88 330.311 21.2 329.991 21.52C329.671 21.808 329.191 22.24 328.551 22.816C327.943 23.392 326.791 24.432 325.095 25.936C323.399 27.44 321.799 28.784 320.295 29.968C316.263 33.232 313.447 35.12 311.847 35.632C311.271 35.792 310.583 35.872 309.783 35.872C309.015 35.872 308.295 35.472 307.623 34.672C306.983 33.872 306.663 32.784 306.663 31.408C306.663 30.032 307.543 28.048 309.303 25.456C311.095 22.864 313.527 20.208 316.599 17.488C316.887 17.264 317.031 17.056 317.031 16.864C317.031 16.672 316.695 16.576 316.023 16.576L312.999 16.672C308.743 16.672 306.551 16.192 306.423 15.232C305.431 15.04 304.935 14.752 304.935 14.368C304.935 14.24 304.999 14.176 305.127 14.176C305.255 14.144 305.367 14.128 305.463 14.128C305.559 14.096 305.719 14.064 305.943 14.032C306.167 14 307.927 13.744 311.223 13.264C314.551 12.784 318.327 12.384 322.551 12.064L325.863 7.64795C326.055 7.26395 326.727 7.07195 327.879 7.07195C329.031 7.07195 329.607 7.31195 329.607 7.79195C329.607 7.95195 329.479 8.23995 329.223 8.65595L328.023 10.336C327.863 10.848 327.767 11.232 327.735 11.488C327.735 11.712 327.959 11.824 328.407 11.824Z"
        {...defaultPathStyle}
      />
    </Icon>
  );
};

export default NeverMissAPost;
