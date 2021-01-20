import React, { Component } from "react";
import { firebase } from "../../firebase";
import bg from "../../Resources/images/bg.svg";
import { ImgSrc, SvgIcons } from "../ui/icons";
import FormField from "../ui/formFields";
import { validate } from "../ui/misc";

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        showlabel: true,
        config: {
          class: "form__input",
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
          label: "Email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        showlabel: true,
        config: {
          class: "form__input",
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
          label: "Password",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
      },
    },
  };
  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }
  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch((error) => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }
  render() {
    return (
      <div
        className="container"
        style={{
          height: "90vh",
        }}
      >
        <div class="login__img">
          <div>
            <svg
              className="login__svg"
              // width="700"
              // height="487"
              viewBox="0 0 965 487"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="undraw_house_searching_n8mp (1) 1">
                <g clip-path="url(#clip0)">
                  <path
                    id="broken-line-right"
                    opacity="0.3"
                    d="M695.7 380.54C796.216 380.54 877.7 299.056 877.7 198.54C877.7 98.0242 796.216 16.54 695.7 16.54C595.184 16.54 513.7 98.0242 513.7 198.54C513.7 299.056 595.184 380.54 695.7 380.54Z"
                    stroke="#FF9800"
                    stroke-width="4"
                    stroke-miterlimit="10"
                    stroke-dasharray="12 12"
                  />
                  <path
                    id="broken-line-left"
                    opacity="0.3"
                    d="M215.7 416.54C316.216 416.54 397.7 335.056 397.7 234.54C397.7 134.024 316.216 52.54 215.7 52.54C115.184 52.54 33.7 134.024 33.7 234.54C33.7 335.056 115.184 416.54 215.7 416.54Z"
                    stroke="#FF9800"
                    stroke-width="4"
                    stroke-miterlimit="10"
                    stroke-dasharray="12 12"
                  />
                  <path
                    id="Vector"
                    d="M849.98 223.13H842.68V465.36H849.98V223.13Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_2"
                    d="M806.423 249.007L801.211 254.117L844.466 298.241L849.679 293.131L806.423 249.007Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_3"
                    d="M889.813 299.123L844.973 330.59L849.166 336.566L894.006 305.098L889.813 299.123Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_4"
                    d="M778.4 226.51H773.41V469.82H778.4V226.51Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_5"
                    d="M813.897 253.935L772.94 298.164L776.601 301.554L817.558 257.325L813.897 253.935Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_6"
                    d="M733.824 304.408L730.848 308.414L773.309 339.948L776.285 335.942L733.824 304.408Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_7"
                    d="M719.19 314.11H714.22V479.18H719.19V314.11Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_8"
                    d="M689.506 331.738L685.956 335.218L715.428 365.281L718.977 361.802L689.506 331.738Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_9"
                    d="M746.346 365.887L715.789 387.33L718.644 391.399L749.201 369.955L746.346 365.887Z"
                    fill="#795548"
                  />
                  <g id="&#60;Group&#62;">
                    <path
                      id="Vector_10"
                      d="M746.58 350.18C749.605 346.73 751.852 342.671 753.17 338.276C754.488 333.882 754.846 329.255 754.219 324.71C753.592 320.166 751.995 315.809 749.537 311.935C747.078 308.062 743.816 304.762 739.97 302.26C741.942 299.18 742.984 295.597 742.97 291.94C743.077 287.476 741.546 283.127 738.667 279.714C735.787 276.301 731.758 274.06 727.34 273.414C722.921 272.768 718.419 273.762 714.683 276.208C710.947 278.654 708.236 282.382 707.06 286.69C704.677 282.603 701.269 279.208 697.172 276.842C693.075 274.477 688.431 273.221 683.7 273.2C668.62 273.2 656.39 285.7 656.39 301.13C656.386 304.416 656.951 307.677 658.06 310.77C657.51 310.77 656.95 310.68 656.39 310.68C653.479 310.713 650.602 311.319 647.925 312.463C645.247 313.607 642.822 315.268 640.786 317.35C638.751 319.432 637.145 321.894 636.062 324.597C634.978 327.299 634.437 330.189 634.47 333.1C634.47 333.86 634.47 334.62 634.58 335.36C629.652 337.57 625.473 341.164 622.551 345.705C619.629 350.247 618.089 355.54 618.12 360.94C618.12 376.31 630.31 388.78 645.34 388.78C646.919 388.779 648.495 388.639 650.05 388.36C649.97 389.29 649.92 390.22 649.92 391.17C649.92 408.42 663.6 422.41 680.46 422.41C686.694 422.413 692.774 420.469 697.85 416.85C701.937 420.432 707.186 422.408 712.62 422.41C715.651 422.376 718.646 421.745 721.433 420.554C724.22 419.363 726.745 417.634 728.864 415.467C730.983 413.299 732.655 410.736 733.783 407.922C734.911 405.109 735.474 402.101 735.44 399.07C735.44 398.51 735.44 397.96 735.36 397.41H735.44C748.94 397.41 759.88 386.22 759.88 372.41C759.899 367.844 758.671 363.36 756.327 359.442C753.983 355.524 750.612 352.322 746.58 350.18V350.18Z"
                      fill="url(#paint0_linear)"
                    />
                  </g>
                  <g id="right-tree">
                    <path
                      id="&#60;Path&#62;"
                      d="M769.87 268.72C762.371 260.739 758.191 250.202 758.18 239.25C758.223 231.693 760.222 224.277 763.982 217.723C767.743 211.168 773.138 205.7 779.64 201.85C776.725 197.617 775.163 192.6 775.16 187.46C775.16 173.02 787.28 161.31 802.23 161.31C808.007 161.253 813.65 163.05 818.33 166.437C823.01 169.825 826.48 174.624 828.23 180.13C831.917 174.337 837.013 169.572 843.041 166.283C849.069 162.993 855.833 161.286 862.7 161.32C884.98 161.32 903.03 178.77 903.03 200.32C903.033 204.916 902.196 209.475 900.56 213.77C901.38 213.71 902.2 213.65 903.03 213.65C920.91 213.65 935.4 227.65 935.4 244.93C935.398 245.986 935.341 247.04 935.23 248.09C949.53 254.09 959.54 267.78 959.54 283.77C959.54 305.22 941.54 322.61 919.34 322.61C916.994 322.61 914.653 322.413 912.34 322.02C912.46 323.31 912.53 324.62 912.53 325.94C912.53 350.01 892.33 369.52 867.42 369.52C858.276 369.544 849.332 366.843 841.73 361.76C835.605 366.789 827.925 369.539 820 369.54C801.39 369.54 786.3 354.96 786.3 336.98C786.3 336.2 786.36 335.44 786.42 334.67H786.3C766.37 334.67 750.21 319.06 750.21 299.8C750.252 293.299 752.116 286.94 755.592 281.446C759.067 275.952 764.014 271.543 769.87 268.72V268.72Z"
                      fill="#009688"
                    />
                    <path
                      id="&#60;Path&#62;_2"
                      d="M847.89 272.9C852.108 268.071 855.24 262.394 857.076 256.251C858.912 250.109 859.408 243.643 858.531 237.292C857.654 230.941 855.425 224.852 851.994 219.437C848.562 214.021 844.008 209.405 838.64 205.9C841.417 201.6 842.89 196.589 842.88 191.47C842.88 176.99 831.41 165.26 817.25 165.26C811.665 165.31 806.248 167.178 801.818 170.581C797.389 173.984 794.188 178.736 792.7 184.12C789.366 178.398 784.595 173.647 778.859 170.337C773.123 167.027 766.622 165.273 760 165.25C738.91 165.25 721.81 182.74 721.81 204.31C721.805 208.905 722.597 213.466 724.15 217.79C723.38 217.73 722.6 217.67 721.81 217.67C704.88 217.67 691.16 231.67 691.16 249.02C691.16 250.09 691.21 251.14 691.32 252.18C684.436 255.277 678.598 260.305 674.516 266.654C670.433 273.004 668.281 280.401 668.32 287.95C668.32 309.45 685.32 326.88 706.39 326.88C708.6 326.878 710.805 326.681 712.98 326.29C712.87 327.59 712.8 328.9 712.8 330.22C712.8 354.35 731.92 373.9 755.51 373.9C764.229 373.903 772.732 371.183 779.83 366.12C785.543 371.13 792.881 373.895 800.48 373.9C818.1 373.9 832.39 359.29 832.39 341.26C832.39 340.48 832.33 339.71 832.28 338.94H832.39C851.26 338.94 866.56 323.29 866.56 303.99C866.584 297.597 864.857 291.319 861.566 285.838C858.274 280.357 853.545 275.883 847.89 272.9V272.9Z"
                      fill="#00897B"
                    />
                    <path
                      id="&#60;Path&#62;_3"
                      d="M664.6 345.18C659.478 339.747 656.617 332.567 656.6 325.1C656.63 319.951 657.994 314.898 660.558 310.432C663.122 305.967 666.799 302.242 671.23 299.62C669.244 296.734 668.18 293.313 668.18 289.81C668.18 279.97 676.44 271.99 686.62 271.99C690.556 271.949 694.401 273.173 697.588 275.484C700.775 277.794 703.135 281.067 704.32 284.82C706.835 280.864 710.313 277.611 714.429 275.367C718.544 273.123 723.162 271.961 727.85 271.99C743.03 271.99 755.34 283.88 755.34 298.55C755.344 301.684 754.774 304.791 753.66 307.72C754.22 307.72 754.77 307.64 755.34 307.64C767.52 307.64 777.4 317.18 777.4 328.95C777.4 329.668 777.364 330.386 777.29 331.1C782.149 333.059 786.316 336.416 789.266 340.745C792.216 345.074 793.815 350.182 793.86 355.42C793.86 370.04 781.59 381.89 766.46 381.89C764.872 381.889 763.286 381.755 761.72 381.49C761.8 382.37 761.85 383.26 761.85 384.16C761.85 400.56 748.09 413.86 731.11 413.86C724.881 413.875 718.788 412.033 713.61 408.57C709.421 412.004 704.167 413.875 698.75 413.86C686.07 413.86 675.75 403.93 675.75 391.67C675.75 391.14 675.75 390.62 675.83 390.1H675.75C662.17 390.1 651.16 379.46 651.16 366.34C651.196 361.909 652.475 357.576 654.85 353.836C657.226 350.095 660.604 347.096 664.6 345.18V345.18Z"
                      fill="#009688"
                    />
                    <path
                      id="&#60;Path&#62;_4"
                      d="M743.05 350.04C745.886 346.798 747.992 342.986 749.227 338.859C750.461 334.733 750.796 330.39 750.207 326.124C749.618 321.857 748.12 317.767 745.814 314.13C743.508 310.492 740.448 307.393 736.84 305.04C738.704 302.156 739.694 298.794 739.69 295.36C739.791 291.169 738.355 287.086 735.652 283.882C732.949 280.678 729.166 278.574 725.018 277.967C720.87 277.36 716.644 278.293 713.136 280.589C709.629 282.885 707.083 286.386 705.98 290.43C703.741 286.591 700.538 283.403 696.688 281.182C692.838 278.961 688.475 277.785 684.03 277.77C669.87 277.77 658.4 289.51 658.4 303.99C658.396 307.075 658.928 310.137 659.97 313.04C659.45 313.04 658.97 312.96 658.4 312.96C652.89 313.023 647.629 315.27 643.773 319.207C639.917 323.144 637.779 328.449 637.83 333.96C637.83 334.68 637.83 335.39 637.93 336.08C633.306 338.153 629.385 341.525 626.642 345.786C623.899 350.047 622.453 355.013 622.48 360.08C622.48 374.51 633.92 386.21 648.03 386.21C649.512 386.207 650.991 386.074 652.45 385.81C652.37 386.68 652.33 387.56 652.33 388.45C652.33 404.64 665.17 417.77 681 417.77C686.854 417.774 692.564 415.949 697.33 412.55C701.163 415.915 706.089 417.771 711.19 417.77C716.934 417.704 722.417 415.36 726.433 411.254C730.45 407.147 732.671 401.614 732.61 395.87C732.61 395.35 732.61 394.87 732.53 394.32H732.61C735.657 394.286 738.667 393.652 741.469 392.455C744.27 391.258 746.809 389.52 748.939 387.341C751.069 385.163 752.75 382.586 753.884 379.758C755.018 376.93 755.584 373.907 755.55 370.86C755.559 366.581 754.399 362.38 752.196 358.711C749.994 355.042 746.831 352.044 743.05 350.04V350.04Z"
                      fill="#00897B"
                    />
                  </g>
                  <path
                    id="Vector_11"
                    d="M696.41 318.9H693.06V482.21H696.41V318.9Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_12"
                    d="M720.228 337.295L692.738 366.982L695.196 369.258L722.686 339.571L720.228 337.295Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_13"
                    d="M666.482 371.185L664.484 373.874L692.984 395.04L694.982 392.351L666.482 371.185Z"
                    fill="#795548"
                  />
                  <path
                    id="Vector_14"
                    d="M687.26 235.33H405.26V486.33H687.26V235.33Z"
                    fill="url(#paint1_linear)"
                  />
                  <path
                    id="Vector_15"
                    d="M680.26 235.33H220.26V478.33H680.26V235.33Z"
                    fill="white"
                  />
                  <path
                    id="Vector_16"
                    d="M250.26 146H681.88C686.256 146 690.453 147.738 693.547 150.833C696.642 153.927 698.38 158.124 698.38 162.5V256.29H250.26V146Z"
                    fill="#C69963"
                  />
                  <path
                    id="Vector_17"
                    opacity="0.7"
                    d="M250.26 146H681.88C686.256 146 690.453 147.738 693.547 150.833C696.642 153.927 698.38 158.124 698.38 162.5V256.29H250.26V146Z"
                    fill="white"
                  />
                  <path
                    id="Vector_18"
                    d="M398.26 121.33L250.26 13.32L102.26 121.33V212.32H398.26V121.33Z"
                    fill="#C69963"
                  />
                  <path
                    id="Vector_19"
                    opacity="0.5"
                    d="M398.26 121.33L250.26 13.32L102.26 121.33V212.32H398.26V121.33Z"
                    fill="white"
                  />
                  <path
                    id="Vector_20"
                    d="M398.26 212.33H102.26V478.33H398.26V212.33Z"
                    fill="white"
                  />
                  <path
                    id="Vector_21"
                    d="M415.73 169.18L250.26 48.75L84.8 169.18L77.73 131.47L250.26 5.91L422.8 131.47L415.73 169.18Z"
                    fill="#C69963"
                  />
                  <path
                    id="roof-dark"
                    opacity="0.2"
                    d="M415.73 169.18L250.26 48.75L84.8 169.18L77.73 131.47L250.26 5.91L422.8 131.47L415.73 169.18Z"
                    fill="black"
                  />
                  <path
                    id="Vector_22"
                    d="M334.26 270.33H166.26V478.33H334.26V270.33Z"
                    fill="#F2F2F2"
                  />
                  <path
                    id="garage-top"
                    d="M334.26 270.33H166.26V306.33H334.26V270.33Z"
                    fill="#C69963"
                  />
                  <path
                    id="garage-bottom"
                    d="M334.26 442.33H166.26V478.33H334.26V442.33Z"
                    fill="#C69963"
                  />
                  <path
                    id="Vector_23"
                    d="M531.6 403.54C531.998 403.54 532.379 403.382 532.661 403.101C532.942 402.819 533.1 402.438 533.1 402.04C533.1 401.642 532.942 401.261 532.661 400.979C532.379 400.698 531.998 400.54 531.6 400.54C531.202 400.54 530.821 400.698 530.539 400.979C530.258 401.261 530.1 401.642 530.1 402.04C530.1 402.438 530.258 402.819 530.539 403.101C530.821 403.382 531.202 403.54 531.6 403.54V403.54Z"
                    fill="#00FF00"
                  />
                  <path
                    id="door"
                    d="M572.26 326.33H490.26V478.33H572.26V326.33Z"
                    fill="#C69963"
                  />
                  <path
                    id="Vector_24"
                    d="M670.26 294.33H593.26V350.33H670.26V294.33Z"
                    fill="#F2F2F2"
                  />
                  <path
                    id="Vector_25"
                    opacity="0.2"
                    d="M670.26 294.33H593.26V319.33H670.26V294.33Z"
                    fill="#C69963"
                  />
                  <path
                    id="Vector_26"
                    d="M109.89 349.11H102.39V486.72H109.89V349.11Z"
                    fill="url(#paint2_linear)"
                  />
                  <path
                    id="Vector_27"
                    d="M60.89 349.11H53.39V486.72H60.89V349.11Z"
                    fill="url(#paint3_linear)"
                  />
                  <path
                    id="Vector_28"
                    d="M82.52 348.16H76.97V486.25H82.52V348.16Z"
                    fill="url(#paint4_linear)"
                  />
                  <g id="left-trees">
                    <path
                      id="Vector_29"
                      d="M83.5863 363.802L80.6299 366.701L105.201 391.766L108.158 388.868L83.5863 363.802Z"
                      fill="#795548"
                    />
                    <path
                      id="Vector_30"
                      d="M130.972 392.275L105.499 410.151L107.877 413.54L133.35 395.664L130.972 392.275Z"
                      fill="#795548"
                    />
                    <path
                      id="&#60;Path&#62;_5"
                      d="M62.83 375.01C58.5709 370.476 56.1969 364.491 56.19 358.27C56.2148 353.978 57.3506 349.766 59.4869 346.044C61.6231 342.322 64.687 339.216 68.38 337.03C66.7244 334.624 65.8386 331.771 65.84 328.85C65.8739 326.864 66.2986 324.905 67.0899 323.083C67.8812 321.262 69.0235 319.614 70.4518 318.234C71.88 316.854 73.5661 315.769 75.4137 315.041C77.2614 314.313 79.2344 313.956 81.22 313.99C84.4993 313.957 87.7025 314.978 90.3579 316.903C93.0133 318.827 94.9806 321.553 95.97 324.68C98.0672 321.382 100.968 318.671 104.4 316.801C107.831 314.931 111.682 313.964 115.59 313.99C128.24 313.99 138.5 323.9 138.5 336.13C138.503 338.741 138.028 341.33 137.1 343.77C137.56 343.77 138.03 343.7 138.5 343.7C148.66 343.7 156.89 351.7 156.89 361.47C156.891 362.068 156.861 362.665 156.8 363.26C160.848 364.896 164.321 367.696 166.777 371.306C169.233 374.916 170.564 379.174 170.6 383.54C170.6 395.73 160.38 405.61 147.76 405.61C146.419 405.61 145.081 405.496 143.76 405.27C143.83 406 143.87 406.75 143.87 407.5C143.87 421.17 132.4 432.26 118.24 432.26C113.062 432.26 108.001 430.722 103.7 427.84C100.207 430.704 95.8268 432.263 91.31 432.25C80.74 432.25 72.17 423.97 72.17 413.75C72.17 413.31 72.17 412.87 72.24 412.44H72.17C60.85 412.44 51.67 403.57 51.67 392.63C51.6995 388.944 52.7606 385.34 54.7329 382.226C56.7053 379.112 59.5102 376.612 62.83 375.01V375.01Z"
                      fill="#009688"
                    />
                    <path
                      id="Vector_31"
                      d="M108.33 349.11H104.19V486.72H108.33V349.11Z"
                      fill="#795548"
                    />
                    <path
                      id="Vector_32"
                      d="M81.9731 392.282L56.4998 410.159L58.878 413.548L84.3513 395.671L81.9731 392.282Z"
                      fill="#795548"
                    />
                    <path
                      id="Vector_33"
                      d="M34.5951 363.804L31.6387 366.702L56.21 391.768L59.1664 388.869L34.5951 363.804Z"
                      fill="#795548"
                    />
                    <path
                      id="&#60;Path&#62;_6"
                      d="M13.83 375.01C9.57092 370.476 7.19692 364.491 7.19002 358.27C7.21481 353.978 8.35064 349.766 10.4869 346.044C12.6231 342.322 15.687 339.216 19.38 337.03C17.7244 334.624 16.8386 331.771 16.84 328.85C16.8739 326.864 17.2986 324.905 18.0899 323.083C18.8812 321.262 20.0235 319.614 21.4518 318.234C22.88 316.854 24.5661 315.769 26.4137 315.041C28.2614 314.313 30.2344 313.956 32.22 313.99C35.4993 313.957 38.7025 314.978 41.3579 316.903C44.0133 318.827 45.9806 321.553 46.97 324.68C49.0672 321.382 51.9677 318.671 55.3995 316.801C58.8314 314.931 62.6819 313.964 66.59 313.99C79.24 313.99 89.5 323.9 89.5 336.13C89.5026 338.741 89.0281 341.33 88.1 343.77C88.56 343.77 89.03 343.7 89.5 343.7C99.66 343.7 107.89 351.7 107.89 361.47C107.891 362.068 107.861 362.665 107.8 363.26C111.848 364.896 115.321 367.696 117.777 371.306C120.233 374.916 121.564 379.174 121.6 383.54C121.6 395.73 111.38 405.61 98.76 405.61C97.4195 405.61 96.0813 405.496 94.76 405.27C94.83 406 94.87 406.75 94.87 407.5C94.87 421.17 83.4 432.26 69.24 432.26C64.0624 432.26 59.0015 430.722 54.7 427.84C51.2074 430.704 46.8268 432.263 42.31 432.25C31.74 432.25 23.17 423.97 23.17 413.75C23.17 413.31 23.17 412.87 23.24 412.44H23.17C11.85 412.44 2.67001 403.57 2.67001 392.63C2.69954 388.944 3.76057 385.34 5.73294 382.226C7.70531 379.112 10.5102 376.612 13.83 375.01V375.01Z"
                      fill="#009688"
                    />
                    <path
                      id="Vector_34"
                      d="M59.33 349.11H55.19V486.72H59.33V349.11Z"
                      fill="#795548"
                    />
                    <path
                      id="&#60;Path&#62;_7"
                      d="M120.23 376.06C122.592 373.358 124.347 370.18 125.375 366.742C126.403 363.303 126.681 359.684 126.19 356.129C125.699 352.574 124.45 349.165 122.528 346.134C120.606 343.103 118.056 340.52 115.05 338.56C116.602 336.155 117.425 333.352 117.42 330.49C117.513 326.992 116.32 323.581 114.067 320.903C111.814 318.225 108.657 316.467 105.195 315.96C101.732 315.454 98.2038 316.235 95.2782 318.155C92.3526 320.075 90.2327 323.002 89.32 326.38C87.454 323.178 84.7838 320.519 81.5739 318.667C78.364 316.815 74.7259 315.833 71.02 315.82C65.2964 315.899 59.8377 318.245 55.841 322.343C51.8444 326.441 49.6359 331.956 49.7 337.68C49.6979 340.25 50.1411 342.801 51.01 345.22C50.58 345.22 50.14 345.15 49.7 345.15C45.1002 345.203 40.7095 347.08 37.4935 350.369C34.2775 353.658 32.4993 358.09 32.55 362.69C32.55 363.29 32.55 363.88 32.64 364.46C28.7866 366.188 25.5181 368.998 23.2316 372.548C20.9451 376.099 19.739 380.237 19.76 384.46C19.6987 390.172 21.9078 395.675 25.9018 399.759C29.8958 403.843 35.348 406.174 41.06 406.24C42.2973 406.239 43.5322 406.129 44.75 405.91C44.69 406.64 44.65 407.37 44.65 408.11C44.65 421.61 55.35 432.55 68.55 432.55C73.429 432.553 78.1872 431.032 82.16 428.2C85.3547 430.995 89.4549 432.538 93.7 432.54C96.0717 432.514 98.4151 432.021 100.596 431.089C102.777 430.157 104.754 428.805 106.412 427.109C108.071 425.414 109.379 423.408 110.262 421.207C111.145 419.005 111.586 416.652 111.56 414.28C111.56 413.84 111.56 413.41 111.5 412.98H111.56C114.1 412.951 116.609 412.423 118.945 411.424C121.28 410.425 123.396 408.977 125.171 407.16C126.947 405.344 128.347 403.196 129.292 400.838C130.238 398.48 130.709 395.96 130.68 393.42C130.685 389.849 129.714 386.344 127.872 383.285C126.031 380.225 123.388 377.727 120.23 376.06V376.06Z"
                      fill="#00897B"
                    />
                    <path
                      id="Vector_35"
                      d="M81.34 350.1H78.55V486.25H81.34V350.1Z"
                      fill="#795548"
                    />
                    <path
                      id="Vector_36"
                      d="M101.227 365.441L78.3098 390.189L80.3569 392.085L103.274 367.336L101.227 365.441Z"
                      fill="#795548"
                    />
                    <path
                      id="Vector_37"
                      d="M56.3922 393.686L54.7287 395.926L78.4921 413.574L80.1556 411.334L56.3922 393.686Z"
                      fill="#795548"
                    />
                  </g>
                  <path
                    id="search-big"
                    d="M730.09 53.9727C715.948 39.26 699.005 27.5252 680.26 19.4589C661.514 11.3927 641.344 7.15809 620.937 7.00434C600.531 6.85059 580.299 10.7808 561.434 18.5637C542.569 26.3465 525.452 37.8248 511.09 52.3227C453.18 110.703 452.2 205.753 508.84 265.323C533.719 291.526 567.069 308.078 602.984 312.048C638.898 316.018 675.058 307.149 705.06 287.013L815.66 402.013C816.337 402.719 817.147 403.284 818.043 403.677C818.939 404.07 819.903 404.282 820.881 404.302C821.859 404.321 822.832 404.147 823.743 403.791C824.653 403.434 825.485 402.901 826.19 402.223L853.75 375.723C854.456 375.046 855.021 374.236 855.414 373.34C855.807 372.444 856.019 371.479 856.039 370.501C856.058 369.523 855.885 368.551 855.528 367.64C855.171 366.729 854.638 365.897 853.96 365.193L743.36 250.193C764.563 221.142 774.855 185.551 772.428 149.668C770.001 113.785 755.011 79.9036 730.09 53.9727V53.9727ZM695.64 238.893C680.042 253.897 660.345 263.939 639.04 267.749C617.735 271.559 595.778 268.965 575.947 260.297C556.116 251.628 539.3 237.274 527.627 219.048C515.954 200.823 509.947 179.545 510.367 157.906C510.787 136.267 517.613 115.239 529.984 97.4795C542.355 79.7204 559.714 66.0284 579.867 58.135C600.019 50.2416 622.059 48.5013 643.201 53.1342C664.342 57.7671 683.635 68.565 698.64 84.1627C708.603 94.5193 716.428 106.737 721.669 120.118C726.91 133.499 729.464 147.781 729.186 162.149C728.907 176.517 725.801 190.69 720.046 203.857C714.29 217.025 705.997 228.93 695.64 238.893V238.893Z"
                    fill="#C69963"
                  />
                  <path
                    id="inside-dot"
                    d="M533.998 117C522.01 117 521.991 136 533.998 136C546.005 136 545.996 117 533.998 117Z"
                    fill="#C69963"
                  />
                  <path
                    id="inside-line"
                    d="M619.441 61.0221C586.3 60.3428 556.13 75.395 540.1 98.1544C534.867 105.563 549.726 112.111 554.929 104.739C568.208 85.9279 593.444 73.9459 620.712 74.6071C649.31 75.2592 675.337 90.0668 689.115 110.616C694.349 118.414 708.038 111.323 702.844 103.57C686.124 78.6192 653.683 61.7285 619.441 61.0221Z"
                    fill="#C69963"
                  />
                </g>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="119032"
                  y1="100523"
                  x2="119032"
                  y2="78259.3"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#808080" stop-opacity="0.25" />
                  <stop
                    offset="0.54"
                    stop-color="#808080"
                    stop-opacity="0.12"
                  />
                  <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="154451"
                  y1="122304"
                  x2="154451"
                  y2="59303.2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#808080" stop-opacity="0.25" />
                  <stop
                    offset="0.54"
                    stop-color="#808080"
                    stop-opacity="0.12"
                  />
                  <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear"
                  x1="898.44"
                  y1="67326.7"
                  x2="898.44"
                  y2="48390.1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#808080" stop-opacity="0.25" />
                  <stop
                    offset="0.54"
                    stop-color="#808080"
                    stop-opacity="0.12"
                  />
                  <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear"
                  x1="481.94"
                  y1="67326.7"
                  x2="481.94"
                  y2="48390.1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#808080" stop-opacity="0.25" />
                  <stop
                    offset="0.54"
                    stop-color="#808080"
                    stop-opacity="0.12"
                  />
                  <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear"
                  x1="519.582"
                  y1="67494.4"
                  x2="519.582"
                  y2="48425.6"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#808080" stop-opacity="0.25" />
                  <stop
                    offset="0.54"
                    stop-color="#808080"
                    stop-opacity="0.12"
                  />
                  <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
                </linearGradient>
                <clipPath id="clip0">
                  <rect width="964.26" height="486.72" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="login__form">
          <form onSubmit={(event) => this.submitForm(event)}>
            <SvgIcons name="avatar"></SvgIcons>
            <h2 className="heading-2 mb-sm">Welcome</h2>

            <FormField
              id={"email"}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"password"}
              formdata={this.state.formdata.password}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formError ? (
              <div className="error_label">Something is wrong, try again.</div>
            ) : null}
            <button
              className="btn__big form__btn"
              onClick={(event) => this.submitForm(event)}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
