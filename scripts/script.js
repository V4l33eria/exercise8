const popupEdit = document.querySelector('.popup_edit');
const popupCard = document.querySelector('.popup_card');
const popupView = document.querySelector('.popup_view');
const userInfoEdit = document.querySelector('.top__middle .user-info__button');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupCardClose = popupCard.querySelector('.popup__close');
const popupViewClose = popupView.querySelector('.popup__close');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewTitle = popupView.querySelector('.popup__card-title');
const popupViewDescription = popupView.querySelector('.popup__card-description');
const popupReactionsCount = popupView.querySelector('.popup__reactions-count');
const cardTemplate = document.getElementById("card-template");
const container = document.querySelector('.container');
const formName = document.getElementById('form__name');
const formDescription = document.getElementById('form__description');
const topUserName = document.getElementById('top__user-name');
const topUserDescription = document.getElementById('top__user-description');
const form = document.querySelector('.popup_edit .form');
const topButton = document.querySelector(".top_button");
const formPlayer = document.querySelector('#form-play');
const formPlayerImputs = document.querySelectorAll(".form-player_imput");

const data = [
    {
        link: "./images/Jiang.jpeg",
        title: "JiangJing Yu",
        description: "Jiang",
        likes: 128
    },
    {
        link: "./images/Jewel.jpeg",
        title: "Jewel",
        description: "Mascot",
        likes: 256
    },
    {
        link: "./images/jan.jpeg",
        title: "Jan Ployshompoo",
        description: "Jan",
        likes: 89
    },
    {
        link: "./images/rachan.jpeg",
        title: "Rachanun",
        description: "Rachanun",
        likes: 174
    },
    {
        link: "./images/lunar.jpeg",
        title: "Lunar",
        description: "Lunar",
        likes: 312
    },
    {
        link: "./images/namtam.jpeg",
        title: "Namtam",
        description: "Namtam",
        likes: 421
    }
];

let currentViewMember = null;

const openViewPopup = (member) => {
    currentViewMember = member;
    popupViewImage.src = member.link;
    popupViewImage.alt = member.title;
    popupViewTitle.textContent = member.title;
    popupViewDescription.textContent = member.description;
    popupReactionsCount.textContent = member.likes;
    popupView.classList.add("popup__open");
};

const createCard = (member) => {
    const card = cardTemplate.content.cloneNode(true);
    const cardElement = card.querySelector('.card');
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardDescription = card.querySelector('.card__description');
    const likeButton = card.querySelector('.card__button_like');
    const deleteButton = card.querySelector('.card__button_delete');
    const likesCountEl = card.querySelector('.card__likes-count');

    cardTitle.textContent = member.title;
    cardImage.src = member.link;
    cardImage.alt = member.title;
    cardDescription.textContent = member.description;

    if (likesCountEl) {
        likesCountEl.textContent = member.likes;
    }

    cardImage.addEventListener("click", () => {
        openViewPopup(member);
    });

    likeButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const isLiked = likeButton.classList.toggle("card__button_like_active");

        if (isLiked) {
            member.likes += 1;
        } else {
            member.likes = Math.max(0, member.likes - 1);
        }

        if (likesCountEl) {
            likesCountEl.textContent = member.likes;
        }

        if (currentViewMember === member) {
            popupReactionsCount.textContent = member.likes;
        }

        console.log("Like: " + member.title + " → " + member.likes);
    });

    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = data.indexOf(member);

        if (index > -1) {
            data.splice(index, 1);
        }

        cardElement.remove();
        popupView.classList.remove("popup__open");
        console.log("Eliminado: " + member.title);
    });

    container.prepend(card);
};

data.forEach((member) => {
    createCard(member);
});

userInfoEdit.addEventListener("click", () => {
    popupEdit.classList.toggle("popup__open");
});

topButton.addEventListener("click", () => {
    popupCard.classList.toggle("popup__open");
});

popupEditClose.addEventListener("click", () => {
    popupEdit.classList.toggle("popup__open");
});

popupCardClose.addEventListener("click", () => {
    popupCard.classList.toggle("popup__open");
});

popupViewClose.addEventListener("click", () => {
    popupView.classList.remove("popup__open");
    currentViewMember = null;
});

// ===== EDITAR USUARIO (ahora sí tiene console.log) =====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newName = formName.value;
    const newDescription = formDescription.value;

    topUserName.textContent = newName;
    topUserDescription.textContent = newDescription;

    console.log("Usuario editado → Nombre: " + newName + " | Descripción: " + newDescription);

    popupEdit.classList.toggle("popup__open");
});

// ===== AGREGAR POST =====
formPlayer.addEventListener("submit", (e) => {
    e.preventDefault();

    const card = {
        link: "",
        title: "",
        description: "",
        likes: 0
    };

    formPlayerImputs.forEach((input) => {
        console.log(input.value);
        card[input.name] = input.value;
    });

    console.log(card);
    data.push(card);
    createCard(card);
    console.log(data);

    popupCard.classList.remove("popup__open");
    formPlayer.reset();
});