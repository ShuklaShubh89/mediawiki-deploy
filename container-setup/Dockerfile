FROM centos/systemd

# install epel and remi repos
RUN yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
RUN yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
# install yum utils 
RUN yum -y install yum-utils
RUN yum-config-manager --enable remi-php74
RUN yum update -y
RUN yum install php -y \
     php-cli  \
     php-fpm \
     php-mysqlnd \
     php-zip \
     php-devel \
     php-gd \
     php-mcrypt \
     php-mbstring \
     php-curl \
     php-xml \
     php-pear \
     php-bcmath \
     php-json \
     mariadb-server \
     mariadb \
     wget \
     sudo && \
     yum clean all

COPY utils/.my.cnf /root/.my.cnf

RUN adduser wikiuser
RUN echo "wikiuser ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/wikiuser && \
    chmod 0440 /etc/sudoers.d/wikiuser

COPY scripts/mariadb-postinstall.sh /home/wikiuser/mariadb-postinstall.sh
COPY scripts/mediawiki-install.sh /home/wikiuser/mediawiki-install.sh
COPY scripts/container-runtime.sh /home/wikiuser/container-runtime.sh
COPY scripts/entrypoint.sh /home/wikiuser/entrypoint.sh

ENTRYPOINT ["/home/wikiuser/entrypoint.sh"]
