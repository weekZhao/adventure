# nocas

----

## 一、介绍

官方文档: https://nacos.io/zh-cn/docs/what-is-nacos.html



官方介绍： Nacos 是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。



Nacos致力于帮助您发现、配置和管理微服务。**【配置中心， 注册中心】**



Nacos 提供了一组简单易用的特性集,帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。



Nacos的关键特性包括:

- 服务发现和服务健康监测
- 动态配置服务
- 动态DNS服务
- 服务及其元数据管理



## 二、适用场景

 ###  1、数据库连接信息

起因：部分项目将数据库基本信息放置在配置文件中，与项目代码一起通过git进行管理。这样存在很大的数据泄露风险。

一般解决方法：

- 将数据库连接信息等敏感配置从项目中剥离； **弊端：敏感信息存放位置** 
- 数据库增加 IP 白名单连接限制； 
- 最小权限原则：每个账号只配置所必需的权限，避免删表删库等高危操作；
- 定期修改数据库账号、密码。 **弊端：下发新账号密码时如何进行，下发后是否可以回滚，历史信息是否可以进行`版本控制`**



使用nocas后，可以使用**nocas的配置管理模块**

> 使用 Nacos 配置管理模块，将敏感配置信息都存放到 Nacos 中。
>
> 
>
> Nacos 配置管理，其中一个立身之本就是为敏感配置保驾护航。它提供上述场景所需的功能，通过命名空间区分不同环境（开发、测试、预发、生产），通过“版本控制”保证变更可追溯，通过“快速回滚”保证错误变更时影响最小，通过的“灰度发布”功能保障配置安全平稳地变更，还有更多更全面功能（权限管控、变更审计等）即将支持。

 ###  2、限流阈值和降级开关

限流、降级，众所周知，是在开发高并发系统过程中需要考虑的两大关键点，是运行时保护系统的两大利器。



限流阈值和降级开关，最终是抽象为一个个的配置项，要想实现运行时的动态调整阈值和开关的启停，将这些配置项存放到 Nacos 的配置模块中最适合不过了。



在今年 8 月的时候，阿里巴巴开源了 Sentinel，以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

在阿里巴巴内部，Nacos 跟 Sentinel 就是多年携手相伴，砥砺前行的好机油，为双 11 等各种大促立下了功劳，也为剁手党提供了良好的购物体验。

 ###  3、流量的动态调度

业务发展壮大到一定的规模，单一的集群已经承载不了全部的用户请求，需要将用户的流量分流到不同的集群上。



当然，更进一步的方案是：不同的集群位于不同的区域，这样，除了缓解业务处理的压力，也给系统带来 **容灾的能力** 。



比如，某电商系统有 1 亿用户量，将系统的流量按照用户的 ID 进行切分，ID 为 1-1000W 的用户请求分发到区域 A 的集群 a 上，ID 为 10001W-2000W 的用户请求流量分发到区域 B 的集群 b 上，以此类推，最终将所有用户的请求流量打散到 10 个不同区域的集群上。

同时，每个集群冗余了一些系统资源。当区域 A 的机房发生不可抗的灾难（如地震）时，我们需要有动态调度流量的能力，最好能秒级得将流量从区域 A 调度到另外可用的区域的集群上。



这正是 Nacos 配置管理大有作为的地方，将用户 ID 的分片和对应的路由规则存放在 Nacos 的中，配合统一接入层等的组件，就能将流量打散到各个集群上，进而让系统能承载更大的流量，以更好的支撑业务的发展。



另外，将其存放与 Nacos 中，也就具备了配置“动态化”的能力，一旦某区域出现基础设施无法及时恢复的问题时，只需在 Nacos 的控制台上修改 ID 分片的路由规则，就能将有问题的区域流量快速切换到其他可用的区域上，保障对业务几乎无损。`Nacos 在阿里内部能做到秒级推送到十万级别机器上的推送效率`。





## 三、安装与使用

### 1.预备环境准备

Nacos 依赖 [Java](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/) 环境来运行。如果您是从代码开始构建并运行Nacos，还需要为此配置 [Maven](https://maven.apache.org/index.html)环境，请确保是在以下版本环境中安装使用:

1. 64 bit OS，支持 Linux/Unix/Mac/Windows，推荐选用 Linux/Unix/Mac。
2. 64 bit JDK 1.8+；[下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) & [配置](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)。
3. Maven 3.2.x+；[下载](https://maven.apache.org/download.cgi) & [配置](https://maven.apache.org/settings.html)。

### 2.下载源码或者安装包

你可以通过源码和发行包两种方式来获取 Nacos。

#### 从 Github 上下载源码方式

```bash
git clone https://github.com/alibaba/nacos.git
cd nacos/
mvn -Prelease-nacos -Dmaven.test.skip=true clean install -U  
ls -al distribution/target/

// change the $version to your actual path
cd distribution/target/nacos-server-$version/nacos/bin
```

#### 下载编译后压缩包方式

您可以从 [最新稳定版本](https://github.com/alibaba/nacos/releases) 下载 `nacos-server-$version.zip` 包。

```bash
  unzip nacos-server-$version.zip 或者 tar -xvf nacos-server-$version.tar.gz
  cd nacos/bin
```

### 3.启动服务器

- 注：Nacos的运行需要以至少2C4g60g*3的机器配置下运行。

#### Linux/Unix/Mac

启动命令(standalone代表着单机模式运行，非集群模式):

```
sh startup.sh -m standalone
```

如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：

```
bash startup.sh -m standalone
```

#### Windows

启动命令(standalone代表着单机模式运行，非集群模式):

```
startup.cmd -m standalone
```

### 4.服务注册&发现和配置管理

#### 服务注册

```
curl -X POST 'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&ip=20.18.7.10&port=8080'
```

#### 服务发现

```
curl -X GET 'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'
```

#### 发布配置

```
curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test&content=HelloWorld"
```

#### 获取配置

```
curl -X GET "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test"
```

### 5.关闭服务器

#### Linux/Unix/Mac

```
sh shutdown.sh
```

#### Windows

```
shutdown.cmd
```

或者双击shutdown.cmd运行文件。











## 总结

其实还有更多更大胆的应用场景，如“大数据实时计算算法调整”、“异地容灾多活”、“应用业务场景动态推送”等等，可以参看 [Nacos 的阿里云产品 ACM 的使用场景](https://help.aliyun.com/document_detail/59972.html) 。



Nacos 配置管理模块，将敏感配置收拢管控起来，极大降低数据泄露等风险，并且提供如“动态推送”、“版本控制”、“快速回滚”等功能，保障了敏感配置的变更安全平稳的执行。



在限流与降级的场景，通过一个示例，为大家演示了如何通过 Nacos + Sentinel 实现流量的动态控制，这也是 Nacos 配置管理的一个十分典型的应用场景。降级也一样，大促高峰期间将某个非关键的系统组件进行关闭，在过了高峰期后再开启，这个也是可以通过 Nacos 的“动态推送”的功能来实现。



总之，只要系统涉及到了“敏感的配置”、“动态的配置”，都应该考虑将配置放入到 Nacos 中，让 Nacos 管控起来。







> 部分引用： 何煦	https://nacos.io/zh-cn/blog/5w1h-where.html  