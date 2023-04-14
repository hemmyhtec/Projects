import 'package:flutter/material.dart';
import 'package:rav_app/screens/splash_screen.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

double _drawerIconSize = 24;

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:
            const Text('Profile Page', style: TextStyle(color: Colors.white)),
        elevation: 0.5,
        iconTheme: const IconThemeData(color: Colors.white),
        flexibleSpace: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: <Color>[
                Theme.of(context).primaryColor,
                Theme.of(context).secondaryHeaderColor
              ])),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(top: 16, right: 16),
            child: Stack(
              children: [
                const Icon(Icons.notifications),
                Positioned(
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(1),
                      decoration: BoxDecoration(
                          color: Colors.red,
                          borderRadius: BorderRadius.circular(6)),
                      constraints:
                          const BoxConstraints(maxWidth: 12, maxHeight: 12),
                      child: const Text(
                        '5',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 8,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ))
              ],
            ),
          )
        ],
      ),
      drawer: Drawer(
        child: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  stops: const [
                0.0,
                1.0
              ],
                  colors: [
                Theme.of(context).primaryColor.withOpacity(0.1),
                Theme.of(context).secondaryHeaderColor.withOpacity(0.5)
              ])),
          child: ListView(
            children: [
              DrawerHeader(
                  decoration: BoxDecoration(
                      color: Theme.of(context).primaryColor,
                      gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          stops: const [
                            0.0,
                            1.0
                          ],
                          colors: [
                            Theme.of(context).primaryColor,
                            Theme.of(context).secondaryHeaderColor
                          ])),
                  child: Container(
                    alignment: Alignment.bottomLeft,
                    child: const Text('HemmyhTec Creatives',
                        style: TextStyle(
                            fontSize: 25,
                            color: Colors.white,
                            fontWeight: FontWeight.bold)),
                  )),
              ListTile(
                leading: Icon(Icons.screen_lock_landscape_rounded,
                    size: _drawerIconSize,
                    color: Theme.of(context).secondaryHeaderColor),
                title: Text('Feeds',
                    style: TextStyle(
                        fontSize: 17,
                        color: Theme.of(context).secondaryHeaderColor)),
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (conttext) =>
                              const SplashScreen(title: 'SplashSceen')));
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
