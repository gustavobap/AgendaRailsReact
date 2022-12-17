FROM ruby:alpine3.17 AS BASE

ARG PROJECT

ARG UNAME
ARG UID
ARG UPASSWORD

ARG GIT_UNAME
ARG GIT_UEMAIL

ARG UHOME="/home/${UNAME}"

RUN apk --no-cache add bash
RUN apk --no-cache add --update nodejs yarn

RUN adduser -S \
    --gecos "" \
    --home "${UHOME}" \
    --ingroup "wheel" \
    --uid "${UID}" \
    "${UNAME}"

RUN echo "${UNAME}:${UPASSWORD}" | chpasswd;

FROM base as development

ARG PROJECT
ARG UNAME
ARG GIT_UNAME
ARG GIT_UEMAIL
ARG UHOME="/home/${UNAME}"

RUN apk --no-cache add git vim sudo busybox-suid
RUN echo '%wheel ALL=(ALL) ALL' > /etc/sudoers.d/wheel

RUN yarn global add serve

USER ${UNAME}
WORKDIR "/${UHOME}/${PROJECT}"

RUN git config --global user.name "${GIT_UNAME}"
RUN git config --global user.email "${GIT_UEMAIL}"

ENTRYPOINT ["/bin/bash"]

FROM base as production

ARG UNAME
ARG PROJECT

ARG WORKD="/home/${UNAME}/${PROJECT}/${PROJECT}"

RUN yarn global add serve

USER ${UNAME}
WORKDIR "${WORKD}"

COPY --chown=${UNAME}:wheel ./${PROJECT}/${PROJECT}/ ../${PROJECT}

RUN yarn
RUN yarn build

ENTRYPOINT serve build -s -p 3000