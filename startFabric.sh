./bin/cryptogen generate --config=crypto-config.yaml

./bin/configtxgen -profile OrdererManagementGenesis -channelID mychannel -outputBlock ./channel-artifacts/genesis.block

./bin/configtxgen -profile AB_Channel -outputCreateChannelTx ./channel-artifacts/AB_Channel.tx -channelID abchannel

./bin/configtxgen -profile AM_Channel -outputCreateChannelTx ./channel-artifacts/AM_Channel.tx -channelID amchannel

./bin/configtxgen -profile AB_Channel -outputAnchorPeersUpdate ./channel-artifacts/AudiMSPAB_Channelanchors.tx -channelID abchannel -asOrg AudiMSP

./bin/configtxgen -profile AM_Channel -outputAnchorPeersUpdate ./channel-artifacts/AudiMSPAM_Channelanchors.tx -channelID amchannel -asOrg AudiMSP

./bin/configtxgen -profile AB_Channel -outputAnchorPeersUpdate ./channel-artifacts/BridgestoneMSPAB_Channelanchors.tx -channelID abchannel -asOrg BridgestoneMSP

./bin/configtxgen -profile AM_Channel -outputAnchorPeersUpdate ./channel-artifacts/MrfMSPAM_Channelanchors.tx -channelID amchannel -asOrg MrfMSP

# docker-compose -f docker-compose-cli.yaml up -d

# docker ps
