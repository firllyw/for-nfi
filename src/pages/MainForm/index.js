import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCards, addCard, generateCard } from "../../actions/cardActions";
import {Stepper, Step, StepButton, Typography, CircularProgress, Snackbar, makeStyles, Button} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Template from '../../components/Template'
import './style.css';
import Wallet from '../../components/Wallet';
import NFT from '../../components/NFT';
import Congrats from '../../components/Congrats';
import NFTModal from '../../components/NFTModal';
import MintingProgress from '../../components/MintingProgress';
import {useWeb3React} from "@web3-react/core";
import {connectors} from '../../components/connenctors';
import {METASLABS_ABI, METASLABS_CONTRACT_ADDRESS} from '../../config';
import Alert from '../../components/Alert';
import Web3 from 'web3';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 13vw',
  },
  instructions: {
    fontWeight: '900',
    fontSize: '18px',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
  },
  stepperWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  stepper: {
    width: '560px',
  }
}));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'SELECT YOUR TEMPLATE';
    case 1:
      return 'SELECT YOUR WALLET';
    case 2:
      return 'SELECT YOUR NFTS';
    default:
      return 'Unknown step';
  }
}

export default function MainForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(null);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(null);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [desiredName, setDesiredName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(-1);
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();
  const steps = getSteps();
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const userRegister = useSelector((state) => state.userRegister);
  const {userInfo: signUpUserInfo} = userRegister;
  const cardData = useSelector((state) => state.getCards);
  const {loading: cardsLoading, cards, error: cardsError} = cardData;
  const addedCard = useSelector((state) => state.addCard);
  const {card, error: addedCardError} = addedCard;
  const generatedCard = useSelector((state) => state.generateCard);
  const {gCard, error: generatedCardError} = generatedCard;
  const [selectWallet, setSelectWallet] = useState(false);
  const navigate = useNavigate();
  const {activate, active, account, deactivate} = useWeb3React();

  useEffect(() => {
    if (!userInfo && !signUpUserInfo) {
      navigate("/auth");
    }
    else {
      dispatch(getCards());
    }
  }, [userInfo, signUpUserInfo, dispatch, navigate]);

  useEffect(() => {
    if (cardsError) {
      setOpenAlert('Getting cards failed')
    }
  }, [cardsError]);

  useEffect(() => {
    if (addedCardError) {
      setOpenAlert('Minting failed');
      setIsMinting(false);
    }
  }, [addedCardError]);

  useEffect(() => {
    if (generatedCardError) {
      setOpenAlert('Minting failed');
      setIsMinting(false);
    }
  }, [generatedCardError]);

  useEffect(() => {
    if (selectWallet && active && account) {
      handleNext();
      getNftData(account);
    }
  }, [selectWallet, active, account])

  const mint = useCallback(async (card) => {
    try {
      console.log('card', card)
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: '0x4'}],
      });
      const web3 = new Web3(Web3.givenProvider)
      const metaslabs = new web3.eth.Contract(METASLABS_ABI, METASLABS_CONTRACT_ADDRESS);
      metaslabs.methods.preSale(account)
        .send({from: account, value: 80000000000000000})
        .once('confirmation', (confirmation, receipt) => {
          const tokenId = receipt.events.Mint.returnValues.tokenId;
          console.log('tokenId', tokenId);
          // const addCardData = {
          //   template: cards[selectedTemplate].name,
          //   name: selectedNft.name,
          //   opensea_url: `https://opensea.io/assets/${selectedNft.asset_contract.address}/${selectedNft.token_id}`,
          //   description: selectedNft.description ?? '',
          //   nft_url: selectedNft.image_original_url,
          //   token_id: Number(tokenId),
          // };
          // dispatch(addCard(addCardData));
          dispatch(generateCard(card.objectId, tokenId));
        })
        .on('error', (error) => {
          console.log(error);
          setIsMinting(false);
          setOpenAlert('Minting failed');
        })
    } catch (e) {
      console.log(e);
      setIsMinting(false);
      setOpenAlert('Minting failed');
    }    
  }, [account]) 

  useEffect(() => {
    if(card && isLastStep()) {
      mint(card);
    }
  }, [card, mint]);

  // useEffect(() => {
  //   if (card) {
  //     console.log('mintedCard', card);
  //     setIsMinting(false);
  //     setCompleted(true);
  //   }
  // }, [card]);
  useEffect(() => {
    if (gCard) {
      console.log('mintedCard', gCard);
      setIsMinting(false);
      setCompleted(true);
    }
  }, [gCard]);

  const getNftData = async (walletAddress) => {
    if (!walletAddress) return;
    setLoading(true);
    const response = await fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=0x60f80121c31a0d46b5279700f9df786054aa5ee5&limit=20`); //Todo: Replace with walletAddress
    // const response = await fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=${walletAddress}&limit=20`); //Todo: Replace with walletAddress
    const data = await response.json();
    setNfts(data.assets);
    setSelectedNft(data.assets[0]);
    setLoading(false);
  }

  const totalSteps = () => {
    return getSteps().length;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleSelectTemplate = (index) => {
    setSelectedTemplate(index);
    handleNext();
  };

  const handleSelectWallet = async (param) => {
    if (param === "metamask") {
      console.log('request change network');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: '0x4'}],
      });
      await activate(connectors.injected);
    }
    else if (param === "coinbase") {
      console.log('request change network');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: '0x4'}],
      });
      await activate(connectors.coinbaseWallet);
    }
    setSelectWallet(true);
  }

  const handleSelectNft = (nft) => {
    setSelectedNft(nft);
    setOpenModal(false);
  }

  const handleMint = () => {    
    setIsMinting(true);
    console.log('dName', desiredName)
    if(desiredName.trim() === '') {
      setOpenAlert('No desired name');
      setIsMinting(false);
      return;
    }
    if (!selectedNft) {
      setOpenAlert('No selected NFT');
      setIsMinting(false);
      return;
    }
    if (cards.length < 1 || selectedTemplate < 0) {
      setOpenAlert('No selected template');
      setIsMinting(false);
      return;
    }
    const addCardData = {
      template: cards[selectedTemplate].name,
      name: desiredName,
      opensea_url: `https://opensea.io/assets/${selectedNft.asset_contract.address}/${selectedNft.token_id}`,
      description: selectedNft.description ?? '',
      nft_url: selectedNft.image_url,
      // token_id: Number(tokenId),
    };
    dispatch(addCard(addCardData));
    // mint(selectedNft);
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleActiveStep = async (index) => {
    if (index <= activeStep) {
      setSelectWallet(false);
      deactivate();
      setActiveStep(index);
    }
  };

  const openNFTModal = () => {
    setOpenModal(true);
  };

  const closeNFTModal = () => {
    setOpenModal(false);
  }

  if(cardsLoading || loading) {
    return (
      <div className={classes.root}>
        <CircularProgress color="white" size={60} thickness={5}/>
      </div>
    );
  }

  if (isMinting) {
    return (
      <div className={classes.root}>
        <MintingProgress />
      </div>
    )
  }

  return (
    <div className="Main">
      <Snackbar open={openAlert ? true : false} onClose={handleCloseAlert} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleCloseAlert} severity="error">
          {openAlert}
        </Alert>
      </Snackbar>
      <div className="myCardsButton">
        <AccountBalanceWalletIcon />
        <Button onClick={() => navigate("/my-cards")}>My Cards</Button>
      </div>
      {completed ? (
        <Congrats card={gCard} />
      ) : (
        <div className="selectWrap">
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div className={classes.stepperWrap}>
            <Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepButton
                      onClick={() => handleActiveStep(index)}
                    >
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            </div>
          <div className={classes.form}>
            {activeStep === 0 && (
                <Template handleClick={(index) => handleSelectTemplate(index)} templates={cards} />
            )}
            {activeStep === 1 && (
                <Wallet handleClick={(param) => handleSelectWallet(param)} />
            )}
            {activeStep === 2 && (
                <NFT handleClick={() => handleMint()} handleModal={openNFTModal} selected={selectedNft} setDisplayName={setDesiredName}/>
              )}
          </div>
        </div>
      )}
      <NFTModal open={openModal} handleClose={closeNFTModal} data={nfts} select={(nft) => handleSelectNft(nft)} selected={selectedNft} />
    </div>
  );
}
