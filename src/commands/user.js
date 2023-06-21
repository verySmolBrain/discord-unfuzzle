const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getImageUrl, hasImageUrl } = require('../utils/userImages/userImages'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!')
		.addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction) {
    let target = interaction.options.getUser('target');

    if (!target) {
      target = interaction.user
    }

    let member = interaction.guild.members.cache.get(target.id);
    const imageUrlAssociated = getImageUrl(target.id)
    console.log(imageUrlAssociated);
  
    const userInfo = {
      color: 0x8300FF,
      title: target.username + '#' + target.discriminator,
      url: 'https://bit.do/YeetYeet',
      author: {
        name: 'unfuzzle',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://bit.do/YeetYeet',
      },
      description: `${target.username}\'s stats`,
      thumbnail: {
        url: target.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'Roles',
          value: `${member.roles.cache.map(r => r).join(' ')}`,
        },
        {
          name: 'Member since',
          value: `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}`,
          inline: true,
        },
        {
          name: 'Discord member since',
          value: `${moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`,
          inline: true,
        },
      ],
      image: {
        ...(hasImageUrl(target.id)) && {url: imageUrlAssociated},
        ...(!hasImageUrl(target.id)) && {url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Double-compound-pendulum.gif'},
      },
      timestamp: new Date(),
      footer: {
        text: 'Want another image? Use /image!',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };

		await interaction.reply({ embeds: [userInfo] });
	},
};